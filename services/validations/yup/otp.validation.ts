import field from "@assets/constants/validation/limits"
import * as yup from "yup"

const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .length(field.otp.length, () => "checkOTP.errors.otpCheck.length")
    .required("checkOTP.errors.otpCheck.required")
})

export default otpValidationSchema
