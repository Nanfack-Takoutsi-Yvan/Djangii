/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Audience from "@services/models/advertising/audience"

type AudienceState = {
  data?: IAdvertisingAudience[]
  loading: boolean
  error?: AxiosError
}

const initialState: AudienceState = {
  data: undefined,
  loading: false
}

export const fetchAudience = createAsyncThunk<
  IAdvertisingAudience[],
  string,
  { rejectValue: AxiosError }
>("audience/fetchAudience", () => Audience.getAudience())

const audienceSlice = createSlice({
  name: "audience",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAudience.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAudience.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAudience.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default audienceSlice.reducer

export const getAllAudience = () => useAppSelector(state => state.audience)
