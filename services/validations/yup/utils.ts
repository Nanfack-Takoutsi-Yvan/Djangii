/* eslint-disable import/prefer-default-export */
import field from "@assets/constants/validation/limits"
import Association from "@services/models/associations/association"
import User from "@services/models/user"
import { HttpStatusCode, isAxiosError } from "axios"

export const testAssociationUsername = async (value?: string) => {
  if (!value) return true

  try {
    await Association.isUsernameAvailable(value)

    return false
  } catch (err) {
    if (isAxiosError(err) && err.status === HttpStatusCode.NotFound) {
      return false
    }

    return true
  }
}

export const testUsername = async (value?: string) => {
  if (!value) return true

  const phoneNumber = value.split(",")[0].split(" ").join("")
  try {
    if (phoneNumber.length > field.phoneNumberLength.min) {
      await User.isPhoneNumberUsed(phoneNumber)
    }
    return false
  } catch (err) {
    if (isAxiosError(err) && err.status === HttpStatusCode.NotFound) {
      return false
    }

    return true
  }
}

export const testEmailAvailability = async (value?: string) => {
  if (!value) return true

  try {
    await User.isEmailUsed(value)

    return false
  } catch (err) {
    if (isAxiosError(err) && err.status === HttpStatusCode.NotFound) {
      return false
    }

    return true
  }
}
