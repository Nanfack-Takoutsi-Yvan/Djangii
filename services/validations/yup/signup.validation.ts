/* eslint-disable no-console */
import StatusesHttp from "@constants/Statuses.http"
import field from "@constants/validation/limits"
import User from "@services/models/user"
import { isAxiosError } from "axios"
import * as yup from "yup"

const signUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("signUp.errors.username.required")
    .test("username", "signUp.errors.username.taken", async value => {
      try {
        await User.isUsernameUsed(value)

        return false
      } catch (err) {
        if (isAxiosError(err) && err.status === StatusesHttp.notFound) {
          return false
        }

        return true
      }
    }),
  firstName: yup.string().required("signUp.errors.firstName"),
  lastName: yup.string().required("signUp.errors.lastName"),
  phoneNumber: yup
    .string()
    .required("signUp.errors.phoneNumber.required")
    .min(
      field.phoneNumberLength.min,
      () => "signUp.errors.phoneNumber.required"
    )
    .test("phoneNumber", "signUp.errors.phoneNumber.taken", async value => {
      const phoneNumber = value.split(",")[0].split(" ").join("")
      try {
        if (phoneNumber.length > field.phoneNumberLength.min) {
          await User.isPhoneNumberUsed(phoneNumber)
        }
        return false
      } catch (err) {
        if (isAxiosError(err) && err.status === StatusesHttp.notFound) {
          return false
        }

        return true
      }
    }),
  email: yup
    .string()
    .email("signUp.errors.email.notValid")
    .required("signUp.errors.email.required")
    .test("email", "signUp.errors.email.taken", async value => {
      try {
        await User.isEmailUsed(value)

        return false
      } catch (err) {
        if (isAxiosError(err) && err.status === StatusesHttp.notFound) {
          return false
        }

        return true
      }
    }),
  password: yup
    .string()
    .min(field.passwordLength.min, () => "signUp.errors.password.length")
    .required("signUp.errors.password.required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "signUp.errors.password.match")
    .min(field.passwordLength.min, () => "signUp.errors.password.length")
    .required("signUp.errors.password.required")
})

export default signUpValidationSchema
