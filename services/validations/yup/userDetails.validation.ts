import * as yup from "yup"

const userDetailsValidationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  description: yup.string()
})

export default userDetailsValidationSchema
