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
  newUser: {
    password: string
    userInfos: {
      countryCode: string
      email: string
      firstName: string
      id: string
      lang: string
      lastName: string
      phone: string
    }
    username: string
  }
}

interface IAuthController {
  login: (username: string, password: string) => Promise<IUser>
  register: (userData: NewUserData) => Promise<IUser>
}
