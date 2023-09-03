import * as yup from "yup"

const singleMemberValidation = yup.object().shape({
  emailMember: yup
    .string()
    .email("signUp.errors.email.notValid")
    .required("pages.emailRequiredForMembers"),
  firstNameMember: yup.string().required("signUp.errors.firstName"),
  lastNameMember: yup.string().required("signUp.errors.lastName"),
  aliasMember: yup.string().required("pages.aliasMemberRequired"),
  role: yup.string().required("pages.roleRequiredForMembers")
})

export default singleMemberValidation

export const virtualMemberValidation = yup.object().shape({
  firstNameMember: yup.string().required("signUp.errors.firstName"),
  lastNameMember: yup.string().required("signUp.errors.lastName"),
  aliasMember: yup.string().required("pages.aliasMemberRequired"),
  role: yup.string().required("pages.roleRequiredForMembers"),
  dateJoinAssociation: yup
    .string()
    .required("pages.dateJoinAssociationRequired")
})

export const tontineRoundValidation = yup.object().shape({
  name: yup.string().required("pages.nameRequired"),
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

export const savingValidation = yup.object().shape({
  name: yup.string().required("pages.nameRequired"),
  maxAmountLoanPerMember: yup
    .number()
    .positive("pages.noNegativeAmount")
    .required("pages.amountRequired"),
  frequency: yup
    .number()
    .positive("pages.noNegativeFrequency")
    .required("pages.frequencyRequired"),
  value: yup.string().required("pages.valueRequired"),
  interestRefundFailPercent: yup
    .number()
    .positive("pages.noNegativeInterestRefundFailPercent")
    .required("pages.interestRefundFailPercentRequired"),
  interestRate: yup
    .number()
    .positive("pages.noNegativeInterestRate")
    .required("pages.interestRateRequired"),
  interestAssociationPercent: yup
    .number()
    .positive("pages.noNegativeInterestAssociationPercent")
    .required("pages.interestAssociationPercentRequired"),
  refundPeriodicityFrequency: yup
    .number()
    .positive("pages.noNegativeFrequency")
    .required("pages.frequencyRequired"),
  refundPeriodicityValue: yup.string().required("pages.valueRequired")
})

export const tontineRoundValidationSchema = yup.object().shape({
  tontineId: yup.string().required("pages.tontineRequired"),
  interestRate: yup.number(),
  maxAmountLoanPerMember: yup.number(),
  interestRefundFailPercent: yup.number(),
  interestAssociationPercent: yup.number()
})
