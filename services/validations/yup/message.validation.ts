import * as yup from "yup"

const messageValidationSchema = yup.object().shape({
  message: yup
    .string()
    .min(25, "settings.contactUsMinLength")
    .required("settings.emptyMessage")
})

export default messageValidationSchema
