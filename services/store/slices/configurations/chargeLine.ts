/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Charge from "@services/models/charges/charges"

type ChargeLinesState = {
  data?: ChargeLine[]
  loading: boolean
  error?: AxiosError
}

const initialState: ChargeLinesState = {
  data: undefined,
  loading: false
}

export const fetchChargeLines = createAsyncThunk<
  ChargeLine[],
  string,
  { rejectValue: AxiosError }
>("ChargeLines/fetchChargeLines", (id: string) => Charge.getCharges(id))

const chargeLinesSlice = createSlice({
  name: "ChargeLines",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChargeLines.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchChargeLines.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchChargeLines.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default chargeLinesSlice.reducer

export const getAllChargeLines = () => useAppSelector(state => state.chargeLine)
