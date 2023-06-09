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
  datation: IDatation
}

interface ISocialProfile {
  hobbies: string[]
  interestCenters: string[]
  activityAreas: string[]
  socialNetworkLinks: string[]
}

interface IDatation {
  creationTime: string
  lastUpdateTime: string
  version: number
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
