import * as yup from "yup"

const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("checkEmail.errors.emailCheck.valid")
    .required("checkEmail.errors.emailCheck.required")
})

export default emailValidationSchema
