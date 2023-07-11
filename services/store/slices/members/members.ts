/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import UserAssociation from "@services/models/associations/userAssociations"

type AssociationMembersState = {
  data?: IUserAssociation[]
  loading: boolean
  error?: AxiosError
}

const initialState: AssociationMembersState = {
  data: undefined,
  loading: false
}

export const fetchAssociationMembers = createAsyncThunk<
  IUserAssociation[],
  string,
  { rejectValue: AxiosError }
>("members/fetchAssociationMembers", (id: string) =>
  UserAssociation.getAllAssociationMembers(id)
)

const associationMembersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAssociationMembers.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAssociationMembers.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAssociationMembers.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default associationMembersSlice.reducer

export const getAllMembers = () => useAppSelector(state => state.members)
