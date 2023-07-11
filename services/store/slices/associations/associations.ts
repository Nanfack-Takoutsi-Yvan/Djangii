/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import UserAssociation from "@services/models/associations/userAssociations"

type associationsData = {
  userAssociations?: IUserAssociation[]
  createdAssociation: IAssociation[]
}

type AssociationState = {
  data: associationsData
  loading: boolean
  error?: AxiosError
  // Called should be used only when in slug
  called: boolean
}

const initialState: AssociationState = {
  data: {
    createdAssociation: []
  },
  loading: false,
  called: false
}

export const fetchUserAssociations = createAsyncThunk<
  IUserAssociation[],
  void,
  { rejectValue: AxiosError }
>("association/fetchUserAssociations", () =>
  UserAssociation.getUserAssociations()
)

export const fetchCreatedAssociation = createAsyncThunk<
  IAssociation[],
  void,
  { rejectValue: AxiosError }
>("association/fetchCreatedAssociation", () =>
  UserAssociation.getCreatedAssociations()
)

const associationSlice = createSlice({
  name: "association",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Fetch user associations
    builder.addCase(fetchUserAssociations.pending, state => {
      state.loading = true

      if (!state.called) {
        state.called = true
      }
    })
    builder.addCase(fetchUserAssociations.fulfilled, (state, action) => {
      state.data.userAssociations = action.payload
      state.loading = false
    })
    builder.addCase(fetchUserAssociations.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })

    // Fetch Created associations
    builder.addCase(fetchCreatedAssociation.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCreatedAssociation.fulfilled, (state, action) => {
      state.loading = false
      state.data.createdAssociation = action.payload
    })
    builder.addCase(fetchCreatedAssociation.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  }
})

export default associationSlice.reducer
export const getAssociations = () => useAppSelector(state => state.associations)
