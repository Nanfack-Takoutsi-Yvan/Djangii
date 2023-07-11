/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Tontine from "@services/models/tontine/tontine"

type initialState = {
  data?: ITontine[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialState = {
  data: undefined,
  loading: false
}

export const fetchTontineList = createAsyncThunk<
  ITontine[],
  string,
  { rejectValue: AxiosError }
>("tontines/fetchTontineList", (associationId: string) =>
  Tontine.getTontineList(associationId)
)

const tontinesSlice = createSlice({
  name: "tontines",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTontineList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTontineList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchTontineList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default tontinesSlice.reducer

export const getAllTontines = () => useAppSelector(state => state.tontines)
