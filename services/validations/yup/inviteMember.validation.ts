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
    .positive("pages.amountRequired")
    .required("pages.amountRequired"),
  frequency: yup
    .number()
    .positive("pages.frequencyRequired")
    .required("pages.frequencyRequired"),
  value: yup.string().required("pages.valueRequired")
})
