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
    // Fetch notifications
    builder.addCase(fetchAllNotifications.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      state.notification = action.payload
      state.loading = false
    })
    builder.addCase(fetchAllNotifications.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  }
})

export const getNotificationsStats = () =>
  useAppSelector(({ notifications }) => notifications.stats)
export const getNotifications = () =>
  useAppSelector(({ notifications }) => ({
    notifications: notifications.notification,
    loading: notifications.loading,
    error: notifications.error
  }))

export default NotificationSlice.reducer
