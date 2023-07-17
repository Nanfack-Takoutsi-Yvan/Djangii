import { membersSelector } from "@services/store/slices/members"
import { getDate } from "@services/utils/functions/format"

export const getAssociationsMemberPages = () => membersSelector.getAllMembers()

export const associationsMembersPagesData = (
  associationsMembers: IUserAssociation[]
) =>
  associationsMembers.map(associationMember => [
    getDate(associationMember.dateJoinAssociation),
    associationMember.firstName,
    associationMember.alias,
    associationMember.lastName,
    `${associationMember.author.firstName} ${associationMember.author.lastName}`,
    associationMember.role,
    associationMember.type,
    associationMember.association.name
  ])
