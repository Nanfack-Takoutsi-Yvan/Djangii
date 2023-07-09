/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import TontineSession from "@services/models/tontine/tontineSessions"

type initialState = {
  data?: ITontineSession[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialState = {
  data: undefined,
  loading: false
}

export const fetchTontineSessionList = createAsyncThunk<
  ITontineSession[],
  string,
  { rejectValue: AxiosError }
>("tontineSession/fetchTontineSessionList", (associationId: string) =>
  TontineSession.getTontineRoundSessionList(associationId)
)

const tontineSessionSlice = createSlice({
  name: "tontineSession",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTontineSessionList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTontineSessionList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchTontineSessionList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default tontineSessionSlice.reducer

export const getAllTontineSessions = () =>
  useAppSelector(state => state.tontineSession)
