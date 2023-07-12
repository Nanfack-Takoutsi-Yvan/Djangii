/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import PenaltyPayment from "@services/models/penalties/penaltyPayment"

type initialPenaltyPaymentState = {
  data?: IPenaltyPayment[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialPenaltyPaymentState = {
  data: undefined,
  loading: false
}

export const fetchPenaltyPaymentList = createAsyncThunk<
  IPenaltyPayment[],
  string,
  { rejectValue: AxiosError }
>("PenaltyPayment/fetchPenaltyPaymentList", (associationId: string) =>
  PenaltyPayment.getPenaltyPaymentList(associationId)
)

const penaltyPaymentSlice = createSlice({
  name: "penaltyPayment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPenaltyPaymentList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPenaltyPaymentList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchPenaltyPaymentList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default penaltyPaymentSlice.reducer

export const getAllPenaltiesPayments = () =>
  useAppSelector(state => state.penaltyPayment)
