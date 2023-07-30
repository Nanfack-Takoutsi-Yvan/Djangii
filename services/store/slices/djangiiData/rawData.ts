/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import DjangiiData from "@services/models/djangiiData"

export type DjangiiDataState = {
  data: {
    countries: ICountry[]
    hobbies: IDjangiiData[]
    activitiesAreas: IDjangiiData[]
    interestCenters: IDjangiiData[]
  }
  error?: AxiosError
  loading: boolean
}

const initialState: DjangiiDataState = {
  data: {
    countries: [],
    hobbies: [],
    activitiesAreas: [],
    interestCenters: []
  },
  loading: false
}

export const fetchAllDjangiiData = createAsyncThunk<
  DjangiiDataState["data"],
  undefined,
  { rejectValue: AxiosError }
>("djangiiData/fetchDashboardData", async (el, api) => {
  try {
    const hobbies = await DjangiiData.getHobbies()
    const interestCenters = await DjangiiData.getInterestCenters()
    const activitiesAreas = await DjangiiData.getActivitiesAreas()
    const countries = await DjangiiData.getCountries()

    return {
      hobbies,
      activitiesAreas,
      cities: [],
      countries,
      interestCenters
    }
  } catch (e) {
    return api.rejectWithValue(e as any)
  }
})

const djangiiDataSlice = createSlice({
  name: "djangiiData",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllDjangiiData.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchAllDjangiiData.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
    builder.addCase(fetchAllDjangiiData.pending, state => {
      state.loading = true
    })
  }
})

export default djangiiDataSlice.reducer

export const getDjangiiDataState = () =>
  useAppSelector(({ djangiiData }) => djangiiData)
