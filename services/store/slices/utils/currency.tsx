/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Currency from "@services/models/utils/currency"

type initialCurrenciesState = {
  data: ICurrency[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialCurrenciesState = {
  data: [],
  loading: false
}

export const fetchCurrencies = createAsyncThunk<
  ICurrency[],
  undefined,
  { rejectValue: AxiosError }
>("currencies/fetchCurrencies", () => Currency.getCurrencies())

const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrencies.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCurrencies.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchCurrencies.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default currenciesSlice.reducer

export const getAllCurrencies = () => useAppSelector(state => state.currencies)
