import * as yup from "yup"

const membershipRequest = yup.object().shape({
  role: yup.string().required("commonErrors.emptyField")
})

export default membershipRequest
