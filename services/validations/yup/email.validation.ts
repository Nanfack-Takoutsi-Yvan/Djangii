import * as yup from "yup"

const emailValidationSchema = yup.object().shape({
  email: yup.string().required("checkEmail.errors.emailCheck.required")
})

export default emailValidationSchema
