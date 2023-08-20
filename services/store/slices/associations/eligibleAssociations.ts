/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import AssociationPage from "@services/models/associations/associationPages"
import { useAppSelector } from "@services/store"

type EligibleAssociationState = {
  data?: IAssociation[]
  loading: boolean
  error?: AxiosError
}

const initialState: EligibleAssociationState = {
  loading: false
}

export const fetchEligibleAssociations = createAsyncThunk<
  IAssociation[],
  void,
  { rejectValue: AxiosError }
>("association-pages/fetchEligibleAssociations", () =>
  AssociationPage.getEligibleAssociations()
)

const eligibleAssociationSlice = createSlice({
  name: "eligible-associations",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEligibleAssociations.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchEligibleAssociations.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchEligibleAssociations.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default eligibleAssociationSlice.reducer

export const getEligibleAssociations = () =>
  useAppSelector(state => state.eligibleAssociations)
