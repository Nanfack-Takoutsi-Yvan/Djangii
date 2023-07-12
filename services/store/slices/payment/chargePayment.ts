/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import ChargePayment from "@services/models/charges/chargePayment"

type initialChargePaymentState = {
  data?: IChargePayment[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialChargePaymentState = {
  data: undefined,
  loading: false
}

export const fetchChargePayment = createAsyncThunk<
  IChargePayment[],
  string,
  { rejectValue: AxiosError }
>("chargePayment/fetchChargePayment", (associationId: string) =>
  ChargePayment.getChargePaymentList(associationId)
)

const chargePaymentSlice = createSlice({
  name: "chargePayment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChargePayment.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchChargePayment.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchChargePayment.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default chargePaymentSlice.reducer

export const getAllChargePayment = () =>
  useAppSelector(state => state.chargePayment)
