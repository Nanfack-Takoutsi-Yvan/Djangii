/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { uniqWith, isEqual } from "lodash"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import Dashboard from "@services/models/dashboard"

interface dashboard extends IDashboardData {
  associationId: string
}

export type DashboardState = {
  defaultAssociationId?: string
  data: dashboard[]
  error?: AxiosError
  loading: boolean
}

const initialState: DashboardState = {
  data: [],
  loading: false
}

export const fetchAssociationDashBoardData = createAsyncThunk<
  dashboard,
  string,
  { rejectValue: AxiosError }
>("dashboard/fetchDashboardData", (id: string) =>
  Dashboard.getData(id).then(res => {
    const data: dashboard = {
      ...res,
      associationId: id
    }

    return data
  })
)

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateDefaultAssociationId: (state, action: PayloadAction<string>) => {
      state.defaultAssociationId = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(
      fetchAssociationDashBoardData.fulfilled,
      (state, action: PayloadAction<dashboard>) => {
        const temp = [...state.data]
        temp.push(action.payload)
        state.data = uniqWith(temp, isEqual)
      }
    )
    builder.addCase(fetchAssociationDashBoardData.rejected, (state, action) => {
      state.error = action.payload
    })
  }
})

export default dashboardSlice.reducer

export const { updateDashboardLoading, updateDefaultAssociationId } =
  dashboardSlice.actions
export const getDashboardData = () =>
  useAppSelector(({ dashboard }) => dashboard.data)
export const isDashBoardLoading = () =>
  useAppSelector(state => state.dashboard.loading)
export const getDefaultAssociationId = () =>
  useAppSelector(state => state.dashboard.defaultAssociationId)
