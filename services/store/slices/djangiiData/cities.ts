/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import DjangiiData from "@services/models/djangiiData"

export type DjangiiDataState = {
  data: ICity[]
  error?: AxiosError
  loading: boolean
}

const initialState: DjangiiDataState = {
  data: [],
  loading: false
}

export const fetchCities = createAsyncThunk<
  ICity[],
  string,
  { rejectValue: AxiosError }
>("djangiiData/fetchCities", async (countryCode, api) =>
  DjangiiData.getCities(countryCode).catch(e => api.rejectWithValue(e as any))
)

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(fetchCities.pending, state => {
      state.loading = true
      state.data = []
    })
  }
})

export default citiesSlice.reducer

export const getCitiesState = () => useAppSelector(({ cities }) => cities)
