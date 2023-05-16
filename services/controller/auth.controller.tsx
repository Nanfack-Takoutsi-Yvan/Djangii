import assert from "assert"
import apiClient from "@services/api/api.client"

export default class AuthController implements IAuthController {
  private resource

  constructor() {
    this.resource = {
      login: "login",
      register: "register",
      resetPassword: "users/me/change-password",
      sendOTP: "public/otp/send/",
      verifyOTP: "public/otp/verify/"
    }
  }

  public login = async (username: string, password: string) => {
    assert(username, "Username cannot be empty")
    assert(password, "Password cannot be empty")

    try {
      const user = await apiClient.post<IUser>(this.resource.login, {
        username,
        password
      })

      if (!user) {
        throw new Error(`No profile found for the username: ${username}`)
      }

      return user.data
    } catch (error) {
      console.log(error)

      throw new Error(`Error while getting user: ${JSON.stringify(error)}`)
    }
  }

  public register = async (userData: NewUserData) => {
    assert(userData, "User data is required")

    try {
      const user = await apiClient.post<NewUserData, IUser>(
        this.resource.register,
        userData
      )

      if (!user) {
        throw new Error(
          `An error occurred while saving : ${userData.newUser.username}`
        )
      }

      return user
    } catch (error) {
      console.log(error)

      throw new Error(`Error while getting user: ${JSON.stringify(error)}`)
    }
  }
}
