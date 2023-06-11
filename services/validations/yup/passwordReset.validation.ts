import field from "@assets/constants/validation/limits"
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
    .oneOf([yup.ref("newPassword")], "passwordReset.errors.password.match")
    .required("passwordReset.errors.passwordConfirm.required")
})

export default passwordResetValidationSchema
