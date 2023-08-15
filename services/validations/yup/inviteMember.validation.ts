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

export const virtualMemberValidation = yup.object().shape({
  firstNameMember: yup.string().required("signUp.errors.firstName"),
  lastNameMember: yup.string().required("signUp.errors.lastName"),
  aliasMember: yup.string().required("pages.aliasMemberRequired"),
  role: yup.string().required("pages.roleRequiredForMembers"),
  dateJoinAssociation: yup
    .string()
    .required("pages.dateJoinAssociationRequired")
})

export default singleMemberValidation
