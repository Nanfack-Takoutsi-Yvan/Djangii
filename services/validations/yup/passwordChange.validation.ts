import field from "@assets/constants/validation/limits"
import * as yup from "yup"

const passwordChangeValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .length(field.passwordLength.min, () => "passwordReset.errors.password.min")
    .required("passwordReset.errors.password.required"),
  newPassword: yup
    .string()
    .min(field.passwordLength.min, () => "passwordReset.errors.password.min")
    .required("passwordReset.errors.password.required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "passwordReset.errors.password.match")
    .required("passwordReset.errors.passwordConfirm.required")
})

export default passwordChangeValidationSchema
