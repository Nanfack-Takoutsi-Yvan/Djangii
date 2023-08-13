import * as yup from "yup"

export const associationValidationSchema = yup.object().shape({
  name: yup.string().required("pages.nameRequired"),
  acronym: yup.string().required("pages.acronymRequired"),
  currency: yup.string().required("pages.currencyRequired")
})

export const associationPageValidationSchema = yup.object().shape({
  associationId: yup.string().required("pages.nameRequired"),
  pageName: yup.string().required("pages.acronymRequired"),
  customUrl: yup.string().required("pages.currencyRequired")
})
