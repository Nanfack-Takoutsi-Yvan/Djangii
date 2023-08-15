/* eslint-disable no-console */
import { HttpStatusCode, isAxiosError } from "axios"
import * as yup from "yup"

import field from "@assets/constants/validation/limits"
import User from "@services/models/user"
import { testEmailAvailability, testUsername } from "./utils"

const signUpValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required("signUp.errors.username.required")
    .matches(/^[0-9a-zA-ZÀ-ÿ-.@+]*$/gi, "signUp.errors.username.whiteSpace")
    .test("username", "signUp.errors.username.taken", async value => {
      try {
        await User.isUsernameUsed(value)

        return false
      } catch (err) {
        if (isAxiosError(err) && err.status === HttpStatusCode.NotFound) {
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
    .test("phoneNumber", "signUp.errors.phoneNumber.taken", testUsername),
  email: yup
    .string()
    .email("signUp.errors.email.notValid")
    .required("signUp.errors.email.required")
    .test("email", "signUp.errors.email.taken", testEmailAvailability),
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
