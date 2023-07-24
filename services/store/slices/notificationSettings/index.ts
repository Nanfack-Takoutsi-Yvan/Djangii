/* eslint-disable react-hooks/rules-of-hooks */
import { AxiosError } from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import { useAppSelector } from "@services/store"
import Notification from "@services/models/notification"

type notificationSettingsState = {
  data?: INotificationParams[]
  loading: boolean
  error?: AxiosError
}

const initialState: notificationSettingsState = {
  data: undefined,
  loading: false
}

export const fetchNotificationSettingParams = createAsyncThunk<
  INotificationParams[],
  undefined,
  { rejectValue: AxiosError }
>("notificationsSettingsParams/fetchNotificationSettingParams", () =>
  Notification.getUserNotificationParams()
)

const NotificationSettingParamsSlice = createSlice({
  name: "notificationsSettingsParams",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotificationSettingParams.pending, state => {
      state.loading = true
    })
    builder.addCase(
      fetchNotificationSettingParams.fulfilled,
      (state, actions) => {
        state.loading = false
        state.data = actions.payload
      }
    )
    builder.addCase(
      fetchNotificationSettingParams.rejected,
      (state, actions) => {
        state.loading = false
        state.error = actions.payload
      }
    )
  }
})

export default NotificationSettingParamsSlice.reducer

export const getAllNotificationSettingsParams = () =>
  useAppSelector(state => state.NotificationParams)
