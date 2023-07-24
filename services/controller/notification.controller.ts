import apiClient from "@services/api/api.client"
import assert from "assert"

export default class NotificationController implements INotificationController {
  private resource

  constructor() {
    this.resource = {
      djangii: {
        stats: "/api/djangii-notifications/stats",
        unreadNumber: "/api/djangii-notifications/count-unreaded",
        markAllAsRead: "/api/djangii-notifications/mark-all-as-readed",
        markAllAsOpen: "/api/djangii-notifications/mark-as-displayed",
        send: "/api/protected/djangii-notifications",
        opened: "/api/djangii-notifications/opened",
        notOpened: "/api/djangii-notifications/not-opened",
        notDisplayed: "/api/djangii-notifications/not-displayed",
        markAsDisplayed: "/api/djangii-notifications/mark-as-displayed",
        markAsRead: "/api/djangii-notifications/mark-all-as-readed",
        createdByMe: "/api/djangii-notifications/created-by-me",
        all: "/api/djangii-notifications",
        settings: "api/notification-parameters/group"
      },
      association: {
        getMine: "/api/association-notifications/me",
        send: "/api/association-notifications"
      }
    }
  }

  public getStats = async (token: string) => {
    assert(token, "token cannot be empty")

    try {
      const res = await apiClient.get<notificationStats>(
        this.resource.djangii.stats,
        { headers: { Authorization: token } }
      )

      if (!res) {
        throw new Error(
          `An error occurred while getting user notification stats`
        )
      }

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting user notification stats: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getNotifications = async (token: string) => {
    assert(token, "can not get notifications without token")
    try {
      const res = await apiClient.get<{ content: INotification[] }>(
        this.resource.djangii.all,
        {
          headers: { Authorization: token }
        }
      )

      if (!res) {
        throw new Error(`An error occurred while getting user notifications`)
      }

      return res.data.content
    } catch (error) {
      const err = {
        message: `An error occurred while getting user notifications: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getNotificationParams = async (token: string) => {
    assert(token, "can not get notifications params without token")
    try {
      const res = await apiClient.get<INotificationParams[]>(
        this.resource.djangii.settings,
        {
          headers: { Authorization: token }
        }
      )

      if (!res) {
        throw new Error(
          `An error occurred while getting user notifications params`
        )
      }

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting user notifications params: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
