import apiClient from "@services/api/api.client"
import assert from "assert"

export default class NotificationController implements INotificationController {
  private resource

  constructor() {
    this.resource = {
      userStats: "/api/djangii-notifications/stats"
    }
  }

  public getStats = async (token: string) => {
    assert(token, "token cannot be empty")

    try {
      const res = await apiClient.get<notificationStats>(
        this.resource.userStats,
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
}
