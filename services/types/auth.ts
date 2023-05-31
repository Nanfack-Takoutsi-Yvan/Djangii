import { OTP_CANAL } from "./miscellaneous"

export interface IUser {
  id: string
  username: string
  accountActivate: boolean
  accountBlocked: boolean
  roleNames: string[]
  userInfos: IUserInfo
}

export interface IUserInfo {
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

export interface ISocialProfile {
  hobbies: string[]
  interestCenters: string[]
  activityAreas: string[]
  socialNetworkLinks: string[]
}

export interface IDatation {
  creationTime: string
  lastUpdateTime: string
  version: number
}

export interface NewUserData {
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

export interface IAuthController {
  login: (username: string, password: string) => Promise<IUser>
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

export type userFormInputs = {
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  passwordConfirm: string
}
