import NotificationController from "@services/controller/notification.controller"
import getTokenFromStorage from "@services/utils/functions/token"
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
    if (notification) {
      Object.assign(this, notification)
    }
  }

  static getUserNotificationStats = async () => {
    const token = await getTokenFromStorage()
    const controller = new NotificationController()

    assert(token, "token is required to get user notification stats")

    const stats = await controller.getStats(token)

    return stats
  }

  static getUserNotifications = async () => {
    const token = await getTokenFromStorage()
    const controller = new NotificationController()

    assert(token, "token is required to get user notifications")

    const notifications = await controller.getNotifications(token)

    return notifications
  }

  static getUserNotificationParams = async () => {
    const token = await getTokenFromStorage()
    const controller = new NotificationController()

    assert(token, "token is required to get user notifications parameters")

    const params = await controller.getNotificationParams(token)

    return params
  }

  static updateNotificationLanguage = async (lang: string) => {
    const token = await getTokenFromStorage()
    const controller = new NotificationController()

    assert(
      token,
      "token is required to update user notifications email language"
    )

    const userInfo = await controller.updateNotificationLanguage(token, lang)

    return userInfo
  }

  static upDateGroupParam = async (params: INotificationParameter[]) => {
    const token = await getTokenFromStorage()
    const controller = new NotificationController()

    assert(token, "token is required to set user notifications parameters")

    const newParams = await controller.upDateGroupParam(token, params)

    return newParams
  }

  public setAsDisplayed = async (callBack: () => void) => {
    const token = await getTokenFromStorage()
    assert(token, "token is required to mark notification as displayed")
    this.displayed = await this.controller.markAsDisplayed(token, this.id)
    if (this.displayed) {
      callBack()
    }
  }

  public setAsRead = async (callBack: () => void) => {
    const token = await getTokenFromStorage()
    assert(token, "token is required to mark notification as displayed")
    const res = await this.controller.markAsRead(token, this.id)
    if (res) {
      this.opened = res.opened
      this.displayed = res.displayed
      callBack()
    }
  }
}
