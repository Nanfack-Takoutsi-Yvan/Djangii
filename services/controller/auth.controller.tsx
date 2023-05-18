/* eslint-disable no-console */
import assert from "assert"
import apiClient from "@services/api/api.client"
import OTP_CANAL from "@services/types/miscelaneaous"
import { IAuthController, IUser, NewUserData } from "@services/types/auth"

export default class AuthController implements IAuthController {
  private resource

  constructor() {
    this.resource = {
      login: "login",
      register: "register",
      resetPassword: "users/me/change-password",
      sendOTP: "api/public/otp/send",
      verifyOTP: "api/public/otp/verify"
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

  public register = async (userData: NewUserData, otp: string) => {
    assert(userData, "User data is required")

    try {
      const res = await apiClient.post<IUser>(
        `${this.resource.register}${otp ? `?otp=${otp}` : ""}`,
        userData
      )

      if (!res) {
        throw new Error(
          `An error occurred while saving : ${userData.newUser.username}`
        )
      }

      return res.data
    } catch (error) {
      console.log(error)

      throw new Error(`Error while getting user: ${JSON.stringify(error)}`)
    }
  }

  public sendOTP = async (email: string, lang?: string, canal?: OTP_CANAL) => {
    assert(email, "email is required")

    try {
      const res = await apiClient.post<boolean>(
        `${this.resource.sendOTP}/${email}?canal=${canal || OTP_CANAL.EMAIL}${
          lang ? `&lang=${lang}` : ""
        }`
      )

      if (!res) {
        throw new Error(`An error occurred while sending otp`)
      }

      return res.data
    } catch (error) {
      console.log(error)

      throw new Error(`An error occurred while sending otp`)
    }
  }

  public validateOTP = async (email: string, otp: string) => {
    assert(email, "email is required")
    assert(otp, "otp is required")

    try {
      const res = await apiClient.post<boolean>(
        `${this.resource.verifyOTP}/${email}/${otp}`
      )

      if (!res) {
        throw new Error(`An error occurred while verifying otp`)
      }

      return res.data
    } catch (error) {
      console.log(error)

      throw new Error(`An error occurred while verifying otp`)
    }
  }
}
