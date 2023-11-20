/* eslint-disable no-console */
import assert from "assert"
import apiClient from "@services/api/api.client"

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
      verifyPhoneNumber: "api/public/users/phone-used",
      verifyEmail: "api/public/users/email-used",
      changePassword: "api/users/me/change-password",
      authProvider: "login/oauth",
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

      return { data: user.data, token: user.headers.authorization }
    } catch (error) {
      const err = {
        message: `Error while getting user: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public loginWithAuthProvider = async (provider: AuthProvider) => {
    assert(provider, "Provider cannot be empty")

    try {
      const response = await apiClient.post<string>(
        this.resource.authProvider,
        null,
        {
          params: {
            account: provider
          }
        }
      )

      if (!response) {
        throw new Error(`Unable to login using: ${provider}`)
      }

      return response
    } catch (error) {
      const err = {
        message: `Error while logging in with ${provider}: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: `Error while saving new user: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public sendOTP = async (email: string, lang?: string, canal?: OTP_CANAL) => {
    assert(email, "email is required")

    try {
      const res = await apiClient.post<boolean>(
        `${this.resource.sendOTP}/${email}?canal=${canal || "EMAIL"}${
          lang ? `&lang=${lang}` : ""
        }`
      )

      if (!res) {
        throw new Error(`An error occurred while sending otp`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while sending otp: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: `An error occurred while verifying otp: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: `An error occurred while getting password reset otp: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: `An error occurred while resetting password: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: `An error occurred while checking if user name exist: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
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
      const err = {
        message: "An error occurred while verifying the phone number",
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public verifyEmail = async (email: string) => {
    assert(email, "email is required")

    try {
      const res = await apiClient.get(`${this.resource.verifyEmail}/${email}`)

      return res.data
    } catch (error) {
      const err = {
        message: "An error occurred while verifying the email address",
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public changePassword = async (token: string, payload: PasswordPayload) => {
    assert(token, "token is required to update password")

    try {
      await apiClient.put(this.resource.changePassword, payload, {
        headers: {
          Authorization: token
        }
      })
    } catch (error) {
      const err = {
        message: "An error occurred while verifying the email address",
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
