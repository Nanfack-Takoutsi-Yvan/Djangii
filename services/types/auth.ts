interface IUser {
  id: string
  username: string
  accountActivate: boolean
  accountBlocked: boolean
  roleNames: string[]
  userInfos: IUserInfo
}

interface IUserInfo {
  id: string
  firstName: string
  lastName: string
  email: string
  lang: string
  phone: string
  countryCode: string
  socialProfil: ISocialProfile
  defaultAssociationId: string
  datation: IHistory
}

interface ISocialProfile {
  hobbies: string[]
  interestCenters: string[]
  activityAreas: string[]
  socialNetworkLinks: string[]
}

interface NewUserData {
  password: string
  userInfos: {
    countryCode?: string
    email: string
    firstName: string
    id?: string
    lang: string
    lastName: string
    phone: string
  }
  username: string
}

interface IAuthController {
  login: (username: string, password: string) => Promise<AuthResponse>
  register: (userData: NewUserData, otp: string) => Promise<IUser>
  sendOTP: (email: string, lang?: string, canal?: OTP_CANAL) => Promise<boolean>
  validateOTP: (email: string, otp: string) => Promise<boolean>
  resetPasswordOTP: (email: string, password: string) => Promise<IUser>
  verifyUsername: (username: string) => Promise<string>
  verifyPhoneNumber: (phoneNumber: string) => Promise<string>
  verifyEmail: (email: string) => Promise<string>
  resetPassword: (
    email: string,
    otp: string,
    username: string
  ) => Promise<IUser>
}

interface userFormInputs {
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  passwordConfirm: string
}

interface IUserNotification {
  buttonEmailClickCount: number
  datation: IHistory
  date: string
  displayed: boolean
  id: string
  notification: INotification
  opened: boolean
  sendByEmail: boolean
  userInfos: IUserInfo
}

interface IUserNotificationParamaterGroupDTO {
  code: string
  description: string
  id: string
  notificationParameters: INotificationParameter
}

interface UserNotificationStatisticDTO {
  notificationNotDiplay: number
  notificationNotOpen: number
}
