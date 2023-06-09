interface INotification {
  buttonEmailClickCount: number
  datation: IHistory
  date: string
  displayed: boolean
  id: string
  notification: INotificationData
  opened: boolean
  sendByEmail: boolean
  userInfos: IUserInfo
}

interface INotificationData {
  association: IAssociation
  author: IUserInfo
  category: INotificationCategory
  data: string
  datation: IHistory
  description: string
  id: string
  sendType: sendNotificationType
  title: string
}

interface INotificationCategory {
  code: string
  datation: IHistory
  description: string
  group: INotificationCategoryGroup
  id: string
}

interface INotificationCategoryGroup {
  code: string
  datation: IHistory
  description: string
  id: string
}

type sendNotificationType =
  | "SEND_TO_USER"
  | "SEND_TO_ADMIN_USERS"
  | "SEND_TO_ALL_USERS"
  | "SEND_TO_ALL_MEMBERS_ASSOCIATION"
  | "SEND_TO_MEMBER_ASSOCIATION"
  | "SEND_TO_ADMIN_ASSOCIATION"
  | "UNDEFINED"

interface INotificationParameter {
  datation: IHistory
  id: string
  notificationCategory: INotificationCategory
  notifyByEmail: boolean
  notifyInPlatform: boolean
  userInfos: IUserInfo
}

interface INotificationParameterRequestBody {
  id: string
  notificationCategory: INotificationCategory
  notifyByEmail: boolean
  notifyInPlatform: boolean
}

interface INotificationRequestBody {
  description: string
  sendType: "SEND_TO_USER" | "SEND_TO_ADMIN_USERS" | "SEND_TO_ALL_USERS"
  title: string
  userInfosIds: []
}

type notificationStats = {
  notificationNotDiplay: number
  notificationNotOpen: number
}

interface INotificationController {
  getStats: (token: string) => Promise<notificationStats>
}
