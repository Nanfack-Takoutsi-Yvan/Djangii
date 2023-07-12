/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import ChargeType from "@services/models/charges/chargeType"

type ChargeTypesState = {
  data?: ICharge[]
  loading: boolean
  error?: AxiosError
}

const initialState: ChargeTypesState = {
  data: undefined,
  loading: false
}

export const fetchChargeTypes = createAsyncThunk<
  ICharge[],
  string,
  { rejectValue: AxiosError }
>("ChargeTypes/fetchChargeTypes", (id: string) => ChargeType.getChargeTypes(id))

const chargeTypesSlice = createSlice({
  name: "ChargeTypes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChargeTypes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchChargeTypes.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchChargeTypes.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default chargeTypesSlice.reducer

export const getAllChargeTypes = () =>
  useAppSelector(state => state.chargeTypes)
