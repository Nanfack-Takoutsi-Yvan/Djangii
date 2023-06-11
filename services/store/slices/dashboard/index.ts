/* eslint-disable react-hooks/rules-of-hooks */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "@services/store"
import Dashboard from "@services/models/dashboard"
import { AxiosError } from "axios"
import { uniqWith, isEqual } from "lodash"

interface dashboard extends IDashboardData {
  associationId: string
}

export type DashboardState = {
  data: dashboard[]
  error?: AxiosError
}

const initialState: DashboardState = {
  data: []
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

const associationSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
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

export default associationSlice.reducer
export const getDashboardData = () =>
  useAppSelector(({ dashboard }) => dashboard.data)
