import NotificationController from "@services/controller/notification.controller"
import getTokenFromStorage from "@utils/functions/token"
import assert from "assert"

export default class Notification implements INotification {
  buttonEmailClickCount = 0

  datation = {} as IHistory

  date = ""

  displayed = false

  id = ""

  notification = {} as INotificationData

  opened = false

  sendByEmail = false

  userInfos = {} as IUserInfo

  private controller = new NotificationController()

  constructor(notification: INotification) {
    Object.assign(this, notification)
  }

  public getUserNotificationStats = async () => {
    const token = await getTokenFromStorage()

    assert(token, "token is required to get user notification stats")

    const stats = await this.controller.getStats(token)

    return stats
  }
}
