/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import AssociationPage from "@services/models/associations/associationPages"
import { useAppSelector } from "@services/store"

type AssociationsPagesState = {
  data?: IAssociationPage[]
  loading: boolean
  error?: AxiosError
}

const initialState: AssociationsPagesState = {
  data: undefined,
  loading: false
}

export const fetchAssociationPages = createAsyncThunk<
  IAssociationPage[],
  void,
  { rejectValue: AxiosError }
>("association-pages/fetchAssociationPages", () =>
  AssociationPage.getAllAssociationPages()
)

const associationPagesSlice = createSlice({
  name: "association-pages",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAssociationPages.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAssociationPages.fulfilled, (state, actions) => {
      state.loading = false
      state.data = actions.payload
    })
    builder.addCase(fetchAssociationPages.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.payload
    })
  }
})

export default associationPagesSlice.reducer

export const getAssociationsPages = () =>
  useAppSelector(state => state.associationsPages)
