import otpValidationSchema from "./yup/otp.validation"
import emailValidationSchema from "./yup/email.validation"
import loginValidationSchema from "./yup/login.validation"
import signUpValidationSchema from "./yup/signup.validation"
import messageValidationSchema from "./yup/message.validation"
import userDetailsValidationSchema from "./yup/userDetails.validation"
import passwordResetValidationSchema from "./yup/passwordReset.validation"
import passwordChangeValidationSchema from "./yup/passwordChange.validation"
import membershipRequestValidationSchema from "./yup/membershipRequest.validation"

export default {
  otpValidationSchema,
  loginValidationSchema,
  emailValidationSchema,
  signUpValidationSchema,
  messageValidationSchema,
  userDetailsValidationSchema,
  passwordResetValidationSchema,
  passwordChangeValidationSchema,
  membershipRequestValidationSchema
}
