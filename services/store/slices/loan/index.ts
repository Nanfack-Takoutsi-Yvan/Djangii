/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Loan from "@services/models/loan"

type initialLoanState = {
  data?: ILoan[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialLoanState = {
  data: undefined,
  loading: false
}

export const fetchLoansList = createAsyncThunk<
  ILoan[],
  string,
  { rejectValue: AxiosError }
>("loans/fetchLoansList", (associationId: string) =>
  Loan.getLoanList(associationId)
)

const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLoansList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchLoansList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchLoansList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default loansSlice.reducer

export const getAllLoans = () => useAppSelector(state => state.loan)
