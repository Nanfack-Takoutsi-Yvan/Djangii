/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Assistance from "@services/models/assistance/assistance"

type AssistanceState = {
  data?: IAssistanceLine[]
  loading: boolean
  error?: AxiosError
}

const initialState: AssistanceState = {
  data: undefined,
  loading: false
}

export const fetchAssistance = createAsyncThunk<
  IAssistanceLine[],
  string,
  { rejectValue: AxiosError }
>("Assistance/fetchAssistance", (id: string) =>
  Assistance.getAssistanceList(id)
)

const assistanceSlice = createSlice({
  name: "Assistance",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAssistance.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAssistance.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAssistance.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default assistanceSlice.reducer

export const getAllAssistance = () => useAppSelector(state => state.assistance)
