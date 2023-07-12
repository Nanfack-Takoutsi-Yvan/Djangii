/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import ProductType from "@services/models/product/productype"

type ProductsTypesState = {
  data?: IProduct[]
  loading: boolean
  error?: AxiosError
}

const initialState: ProductsTypesState = {
  data: undefined,
  loading: false
}

export const fetchProductsTypes = createAsyncThunk<
  IProduct[],
  string,
  { rejectValue: AxiosError }
>("ProductsTypes/fetchProductsTypes", (id: string) =>
  ProductType.getProducts(id)
)

const productsTypesSlice = createSlice({
  name: "ProductsTypes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductsTypes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProductsTypes.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchProductsTypes.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default productsTypesSlice.reducer

export const getAllProductsTypes = () =>
  useAppSelector(state => state.productTypes)
