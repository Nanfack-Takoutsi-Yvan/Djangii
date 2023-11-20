type SingleMemberObj = {
  emailMember: string
  firstNameMember: string
  lastNameMember: string
  aliasMember: string
  role: string
  langMember: string
  idAssociation: string
  idMember: string
  nameAssociation: string
}

type VirtualMemberConfig = {
  firstNameMember: string
  lastNameMember: string
  aliasMember: string
  role: string
  dateJoinAssociation: string
  associationId: string
}

type UpdateMemberObj = VirtualMemberConfig & {
  userInfosId: string
}

type NewTontine = {
  amount: number
  association: IAssociation
  name: string
  periodicity: ITontinePeriodicity
  type: string
}
