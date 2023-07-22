import * as yup from "yup"

const messageValidationSchema = yup.object().shape({
  message: yup.string().required("commonErrors.emptyField")
})

export default messageValidationSchema
