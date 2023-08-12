import * as yup from "yup"

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("signUp.errors.email.notValid")
    .required("checkEmail.errors.emailCheck.required")
})

export default emailValidationSchema
