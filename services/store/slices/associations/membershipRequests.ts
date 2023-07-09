/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import MembershipRequest from "@services/models/associations/membershipRequest"

type MembershipRequestState = {
  data?: IMembershipRequest[]
  loading: boolean
  error?: AxiosError
}

const initialState: MembershipRequestState = {
  loading: false
}

export const fetchMembershipRequests = createAsyncThunk<
  IMembershipRequest[],
  void,
  { rejectValue: AxiosError }
>("membership-request/fetchMembershipRequests", () =>
  MembershipRequest.getAllMembershipRequest()
)

const membershipRequestSlice = createSlice({
  name: "membership-request",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMembershipRequests.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchMembershipRequests.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchMembershipRequests.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default membershipRequestSlice.reducer

export const getAllMembershipRequest = () =>
  useAppSelector(state => state.membershipRequests)
