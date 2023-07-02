/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import Association from "@services/models/association"

type AssociationState = {
  data: IAssociation[]
  loading: boolean
  error?: AxiosError
}

const initialState: AssociationState = {
  data: [],
  loading: false
}

export const fetchUserAssociations = createAsyncThunk<
  IAssociation[],
  void,
  { rejectValue: AxiosError }
>("association/fetchUserAssociations", () => Association.getAssociations())

const associationSlice = createSlice({
  name: "association",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUserAssociations.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchUserAssociations.fulfilled,
      (state, action: PayloadAction<IAssociation[]>) => {
        state.data = action.payload
        state.loading = false
      }
    )
    builder.addCase(fetchUserAssociations.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  }
})

export default associationSlice.reducer
export const associationActions = associationSlice.actions
export const getAssociations = () => useAppSelector(state => state.associations)
