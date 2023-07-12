/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import ProductPayment from "@services/models/product/productPayment"

type initialProductPaymentState = {
  data?: IProductPayment[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialProductPaymentState = {
  data: undefined,
  loading: false
}

export const fetchProductPaymentList = createAsyncThunk<
  IProductPayment[],
  string,
  { rejectValue: AxiosError }
>("productPayment/fetchProductPaymentList", (associationId: string) =>
  ProductPayment.getProductPaymentList(associationId)
)

const productPaymentSlice = createSlice({
  name: "productPayment",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductPaymentList.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProductPaymentList.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchProductPaymentList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default productPaymentSlice.reducer

export const getAllProductsPayments = () =>
  useAppSelector(state => state.productPayment)
