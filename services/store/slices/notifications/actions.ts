import { createAsyncThunk } from "@reduxjs/toolkit"
import Notification from "@services/models/notification"
import { AxiosError } from "axios"

export const fetchNotificationsStats = createAsyncThunk<
  notificationStats,
  void,
  { rejectValue: AxiosError }
>("notification/fetch-notifications-stats", () =>
  Notification.getUserNotificationStats()
)

export const fetchAllNotifications = createAsyncThunk<
  INotification[],
  void,
  { rejectValue: AxiosError }
>("notification/get-all-notifications", () =>
  Notification.getUserNotifications()
)
