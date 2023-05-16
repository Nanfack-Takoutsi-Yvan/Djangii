import AuthController from "@services/controller/auth.controller"
import assert from "assert"

export default class User implements IUser {
  id = ""

  username = ""

  accountActivate = false

  accountBlocked = false

  roleNames: string[] = []

  userInfos: IUserInfo = {
    id: "",

    firstName: "",

    lastName: "",

    email: "",

    lang: "",

    phone: "",

    countryCode: "",

    socialProfil: {
      hobbies: [],

      interestCenters: [],

      activityAreas: [],

      socialNetworkLinks: []
    },

    datation: {
      creationTime: "",

      lastUpdateTime: "",

      version: 0
    }
  }

  constructor(user: IUser) {
    Object.assign(this, user)
  }

  static login = async (username: string, password: string) => {
    assert(username, "Username cannot be empty")
    assert(password, "Password cannot be empty")

    const controller = new AuthController()

    const user = await controller.login(username, password)

    return new User(user)
  }
}
