/* eslint-disable react-hooks/rules-of-hooks */
import { createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import { fetchAllNotifications, fetchNotificationsStats } from "./actions"

type NotificationState = {
  loading: boolean
  stats: notificationStats
  notification: INotification[]
  error?: AxiosError
}

const initialState: NotificationState = {
  loading: false,
  notification: [],
  stats: {
    notificationNotDiplay: 0,
    notificationNotOpen: 0
  }
}

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNotificationsStats.fulfilled, (state, action) => {
      state.stats = action.payload
    })
    builder.addCase(fetchNotificationsStats.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(fetchAllNotifications.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      state.notification = action.payload
    })
    builder.addCase(fetchAllNotifications.rejected, (state, action) => {
      state.error = action.payload
    })
  }
})

export const getNotifications = () =>
  useAppSelector(({ notifications }) => notifications.notification)
export const getNotificationsStats = () =>
  useAppSelector(({ notifications }) => notifications.stats)

export default NotificationSlice.reducer
