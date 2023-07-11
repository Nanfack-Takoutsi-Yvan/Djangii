/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import TontineRound from "@services/models/tontine/tontineRounds"

type initialState = {
  data?: ITontineRound[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialState = {
  data: undefined,
  loading: false
}

export const fetchTontineRoundList = createAsyncThunk<
  ITontineRound[],
  string,
  { rejectValue: AxiosError }
>("tontineRound/fetchTontineRoundList", (associationId: string) =>
  TontineRound.getTontinesRounds(associationId)
)

const tontineRoundSlice = createSlice({
  name: "tontineRound",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTontineRoundList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTontineRoundList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchTontineRoundList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default tontineRoundSlice.reducer

export const getAllTontineRound = () =>
  useAppSelector(state => state.tontineRound)
