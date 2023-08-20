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

export const productTypesValidation = yup.object().shape({
  designation: yup.string().required("pages.designationRequired"),
  amount: yup
    .number()
    .positive("pages.noNegativeAmount")
    .required("pages.amountRequired"),
  frequency: yup
    .number()
    .positive("pages.noNegativeFrequency")
    .required("pages.frequencyRequired"),
  value: yup.string().required("pages.valueRequired"),
  required: yup.boolean()
})

export const chargeTypeValidation = yup.object().shape({
  description: yup.string().required("pages.descriptionRequired"),
  designation: yup.string().required("pages.designationRequired"),
  chargeLines: yup.string().required("pages.chargeLineRequired"),
  amount: yup
    .number()
    .positive("pages.noNegativeAmount")
    .required("pages.amountRequired")
})

export const assistanceTypeValidation = yup.object().shape({
  contition: yup.string().required("pages.conditionRequired"),
  designation: yup.string().required("pages.designationRequired"),
  memo: yup.string().required("pages.memoRequired"),
  amount: yup
    .number()
    .positive("pages.noNegativeAmount")
    .required("pages.amountRequired"),
  frequency: yup
    .number()
    .positive("pages.noNegativeFrequency")
    .required("pages.frequencyRequired"),
  value: yup.string().required("pages.valueRequired")
})
