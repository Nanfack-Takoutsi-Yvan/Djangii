/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Guarantee from "@services/models/guarantee"

type GuaranteesState = {
  data?: IGuarantee[]
  loading: boolean
  error?: AxiosError
}

const initialState: GuaranteesState = {
  data: undefined,
  loading: false
}

export const fetchGuarantees = createAsyncThunk<
  IGuarantee[],
  string,
  { rejectValue: AxiosError }
>("guarantees/fetchGuarantees", (id: string) => Guarantee.getGuarantees(id))

const guaranteesSlice = createSlice({
  name: "guarantees",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchGuarantees.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchGuarantees.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchGuarantees.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default guaranteesSlice.reducer

export const getAllGuarantees = () => useAppSelector(state => state.guarantee)
