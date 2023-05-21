import field from "@constants/validation/limits"
import * as yup from "yup"

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("login.errors.username"),
  password: yup
    .string()
    .min(field.passwordLength.min, () => "login.errors.password.length")
    .required("login.errors.password.required")
})

export default loginValidationSchema
