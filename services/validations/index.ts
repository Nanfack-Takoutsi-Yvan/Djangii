import loginValidationSchema from "./yup/login.validation"
import signUpValidationSchema from "./yup/signup.validation"
import otpValidationSchema from "./yup/otp.validation"
import emailValidationSchema from "./yup/email.validation"
import passwordResetValidationSchema from "./yup/passwordReset.validation"

export default {
  loginValidationSchema,
  signUpValidationSchema,
  otpValidationSchema,
  emailValidationSchema,
  passwordResetValidationSchema
}
