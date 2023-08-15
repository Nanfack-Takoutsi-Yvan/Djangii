import * as yup from "yup"
import { testAssociationUsername } from "./utils"

export const associationValidationSchema = yup.object().shape({
  name: yup.string().required("pages.nameRequired"),
  acronym: yup.string().required("pages.acronymRequired"),
  currency: yup.string().required("pages.currencyRequired")
})

export const associationPageValidationSchema = yup.object().shape({
  name: yup.string().required("pages.pageNameRequired"),
  associationId: yup.string().required("pages.associationMandatory"),
  username: yup
    .string()
    .matches(/^[0-9a-zA-ZÀ-ÿ-._]*$/gi, "pages.linkShouldNotContainWhiteSpaces")
    .test("username", "pages.linkNotAvailable", testAssociationUsername)
    .required("pages.linkRequired")
})
