/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import TontineRoundSubscription from "@services/models/tontine/tontineRoundSubscription"

type initialState = {
  data?: ITontineRoundSubscription[]
  loading: boolean
  error?: AxiosError
}

const initialState: initialState = {
  data: undefined,
  loading: false
}

export const fetchTontineSubscriptionList = createAsyncThunk<
  ITontineRoundSubscription[],
  string,
  { rejectValue: AxiosError }
>("tontineSubscription/fetchTontineSubscriptionList", () =>
  TontineRoundSubscription.getTontineRoundSubscriptionList()
)

const tontineSubscriptionSlice = createSlice({
  name: "tontineSubscription",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTontineSubscriptionList.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchTontineSubscriptionList.fulfilled,
      (state, actions) => {
        state.loading = false
        state.data = actions.payload
      }
    )
    builder.addCase(fetchTontineSubscriptionList.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default tontineSubscriptionSlice.reducer

export const getAllTontineSubscription = () =>
  useAppSelector(state => state.tontineSubscription)
