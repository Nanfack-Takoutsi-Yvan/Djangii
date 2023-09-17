/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { useAppSelector } from "@services/store"
import Notification from "@services/models/notification"
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
  reducers: {
    markNotificationAsRead: (
      state,
      action: PayloadAction<INotification["id"]>
    ) => {
      state.notification.map(notification => {
        if (notification.id === action.payload) {
          notification.opened = true
          notification.displayed = true
        }

        return notification
      })
    },
    markNotificationAsDisplayed: (
      state,
      action: PayloadAction<INotification["id"]>
    ) => {
      state.notification.map(notification => {
        if (notification.id === action.payload) {
          notification.displayed = true
        }

        return notification
      })
    }
  },
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
    error: notifications.error,
    loading: notifications.loading,
    notifications: notifications.notification.map(
      notification => new Notification(notification)
    )
  }))

export const { markNotificationAsRead, markNotificationAsDisplayed } =
  NotificationSlice.actions

export default NotificationSlice.reducer
