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
      register: "api/register",
      resetPassword: "api/public/users/reset-password",
      sendOTP: "api/public/otp/send",
      verifyOTP: "api/public/otp/verify",
      verifyUsername: "api/public/users/username-used",
      verifyPhoneNumber: "backend/api/public/users/phone-used",
      verifyEmail: "api/public/users/email-used",
      resetPasswordOTP: {
        start: "api/public/users/",
        end: "/reset-password-request"
      }
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
        throw new Error(`An error occurred while saving : ${userData.username}`)
      }

      return res.data
    } catch (error) {
      throw new Error(`Error while saving new user: ${JSON.stringify(error)}`)
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
      throw new Error(`An error occurred while sending otp: ${error}`)
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
      throw new Error(`An error occurred while verifying otp: ${error}`)
    }
  }

  public resetPasswordOTP = async (email: string) => {
    assert(email, "email is required")

    try {
      const res = await apiClient.post<IUser>(
        `${this.resource.resetPasswordOTP.start}${email}${this.resource.resetPasswordOTP.end}`
      )

      if (!res) {
        throw new Error(`An error occurred while getting password reset otp`)
      }

      return res.data
    } catch (error) {
      throw new Error(
        `An error occurred while getting password reset otp: ${error}`
      )
    }
  }

  public resetPassword = async (
    otp: string,
    newPassword: string,
    username: string
  ) => {
    assert(username, "username is required")
    assert(otp, "otp is required")
    assert(newPassword, "password is required")

    try {
      const res = await apiClient.post(this.resource.resetPassword, {
        otp,
        newPassword,
        username
      })

      if (!res) {
        throw new Error(`An error occurred while resetting password`)
      }

      return res.data
    } catch (error) {
      throw new Error(`An error occurred while resetting password: ${error}`)
    }
  }

  public verifyUsername = async (username: string) => {
    assert(username, "username is required")

    try {
      const res = await apiClient.get(
        `${this.resource.verifyUsername}/${username}`
      )

      return res.data
    } catch (error) {
      throw new Error(
        `An error occurred while checking if user name exist: ${error}`
      )
    }
  }

  public verifyPhoneNumber = async (phoneNumber: string) => {
    assert(phoneNumber, "phoneNumber is required")

    try {
      const res = await apiClient.get(
        `${this.resource.verifyPhoneNumber}/${phoneNumber}`
      )

      return res.data
    } catch (error) {
      throw new Error(
        `An error occurred while verifying the phone number: ${error}`
      )
    }
  }

  public verifyEmail = async (email: string) => {
    assert(email, "email is required")

    try {
      const res = await apiClient.get(`${this.resource.verifyEmail}/${email}`)

      return res.data
    } catch (error) {
      throw new Error(
        `An error occurred while verifying the email address: ${error}`
      )
    }
  }
}
