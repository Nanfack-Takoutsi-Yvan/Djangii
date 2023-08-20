import * as yup from "yup"

// eslint-disable-next-line import/prefer-default-export
export const penaltyTypesValidation = yup.object().shape({
  description: yup.string().required("pages.descriptionRequired"),
  designation: yup.string().required("pages.designationRequired"),
  amount: yup
    .number()
    .positive("pages.noNegativeAmount")
    .required("pages.amountRequired"),
  majoration: yup
    .number()
    .positive("pages.noNegativeMajoration")
    .required("pages.majorationRequired")
})

export const chargeLineValidationForm = yup.object().shape({
  designation: yup.string().required("pages.designationRequired")
})

export const guaranteeValidationForm = yup.object().shape({
  description: yup.string().required("pages.descriptionRequired"),
  designation: yup.string().required("pages.designationRequired")
})
