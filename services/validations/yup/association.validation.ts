import * as yup from "yup"

const associationValidationSchema = yup.object().shape({
  name: yup.string().required("pages.nameRequired"),
  acronym: yup.string().required("pages.acronymRequired"),
  currency: yup.string().required("pages.currencyRequired")
})

export default associationValidationSchema
