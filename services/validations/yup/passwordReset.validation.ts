import field from "@constants/validation/limits"
import * as yup from "yup"

const passwordResetValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .length(field.otp.length, () => "passwordReset.errors.otp.length")
    .required("passwordReset.errors.otp.required"),
  newPassword: yup
    .string()
    .min(field.passwordLength.min, () => "passwordReset.errors.password.min")
    .required("passwordReset.errors.password.required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "signUp.errors.password.match")
    .min(
      field.passwordLength.min,
      () => "passwordReset.errors.passwordConfirm.min"
    )
    .required("passwordReset.errors.passwordConfirm.required")
})

export default passwordResetValidationSchema
