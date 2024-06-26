import field from "@assets/constants/validation/limits"
import * as yup from "yup"

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[0-9a-zA-ZÀ-ÿ-.@+]*$/gi, "signUp.errors.username.whiteSpace")
    .required("login.errors.username.required"),
  password: yup
    .string()
    .min(field.passwordLength.min, () => "login.errors.password.length")
    .required("login.errors.password.required")
})

export default loginValidationSchema
