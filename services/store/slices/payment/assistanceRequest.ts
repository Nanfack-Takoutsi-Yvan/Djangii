/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import AssistanceRequest from "@services/models/assistance/assistanceRequest"

type initialAssistanceRequestState = {
  data?: IAssistanceRequest[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialAssistanceRequestState = {
  data: undefined,
  loading: false
}

export const fetchAssistanceRequest = createAsyncThunk<
  IAssistanceRequest[],
  string,
  { rejectValue: AxiosError }
>("assistanceRequest/fetchAssistanceRequest", (associationId: string) =>
  AssistanceRequest.getAssistanceRequestList(associationId)
)

const assistanceRequestSlice = createSlice({
  name: "assistanceRequest",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAssistanceRequest.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAssistanceRequest.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAssistanceRequest.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default assistanceRequestSlice.reducer

export const getAllAssistanceRequest = () =>
  useAppSelector(state => state.assistanceRequest)
