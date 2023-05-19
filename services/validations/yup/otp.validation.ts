import field from "@constants/validation/limits"
import * as yup from "yup"

const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .length(field.otp.length, () => "checkEmail.errors.otpCheck.length")
    .required("checkEmail.errors.otpCheck.required")
})

export default otpValidationSchema
