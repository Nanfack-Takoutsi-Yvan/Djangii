import field from "@constants/validation/limits"
import * as yup from "yup"

const signUpValidationSchema = yup.object().shape({
  username: yup.string().required("signUp.errors.username"),
  firstName: yup.string().required("signUp.errors.firstName"),
  lastName: yup.string().required("signUp.errors.lastName"),
  phoneNumber: yup
    .string()
    .required("signUp.errors.phoneNumber")
    .min(field.phoneNumberLength.min, () => "signUp.errors.phoneNumber"),
  email: yup
    .string()
    .email("signUp.errors.email.notValid")
    .required("signUp.errors.email.required"),
  password: yup
    .string()
    .min(field.passwordLength.min, () => "signUp.errors.password.length")
    .required("signUp.errors.password.required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "signUp.errors.password.match")
    .min(field.passwordLength.min, () => "signUp.errors.password.length")
    .required("signUp.errors.password.required")
})

export default signUpValidationSchema
