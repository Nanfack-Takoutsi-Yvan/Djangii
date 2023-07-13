/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Advertising from "@services/models/advertising/advertising"

type AdvertisingState = {
  data?: IAdvertising[]
  loading: boolean
  error?: AxiosError
}

const initialState: AdvertisingState = {
  data: undefined,
  loading: false
}

export const fetchAdvertising = createAsyncThunk<
  IAdvertising[],
  string,
  { rejectValue: AxiosError }
>("Advertising/fetchAdvertising", () => Advertising.getAdverts())

const advertisingSlice = createSlice({
  name: "Advertising",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAdvertising.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAdvertising.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAdvertising.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default advertisingSlice.reducer

export const getAllAdvertising = () =>
  useAppSelector(state => state.advertising)
