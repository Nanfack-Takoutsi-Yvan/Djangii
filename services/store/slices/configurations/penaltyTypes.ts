/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Penalty from "@services/models/penalties/penalty"

type PenaltiesTypesState = {
  data?: IAssociationPenalty[]
  loading: boolean
  error?: AxiosError
}

const initialState: PenaltiesTypesState = {
  data: undefined,
  loading: false
}

export const fetchPenaltiesTypes = createAsyncThunk<
  IAssociationPenalty[],
  string,
  { rejectValue: AxiosError }
>("PenaltiesTypes/fetchPenaltiesTypes", (id: string) =>
  Penalty.getPenalties(id)
)

const penaltiesTypesSlice = createSlice({
  name: "PenaltiesTypes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPenaltiesTypes.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchPenaltiesTypes.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchPenaltiesTypes.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default penaltiesTypesSlice.reducer

export const getAllPenaltiesTypes = () =>
  useAppSelector(state => state.penaltyTypes)
