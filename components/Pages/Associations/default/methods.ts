import { getDate } from "@services/utils/functions/format"
import { associationSelector } from "@store/slices/associations"
import { manageableAssociationRoles } from "../utils"

export const manageableAssociationsDataTable = (
  userAssociations: IUserAssociation[]
) =>
  userAssociations
    .filter(userAssociation =>
      manageableAssociationRoles.has(userAssociation.role)
    )
    .map(userAssociation => [
      getDate(userAssociation.association.datation.creationTime),
      userAssociation.association.acronym,
      userAssociation.association.name,
      `${userAssociation.association.activated}`,
      userAssociation.id
    ])

export const joinedAssociationsDataTable = (
  userAssociations: IUserAssociation[]
) =>
  userAssociations.map(userAssociation => [
    getDate(userAssociation.datation.creationTime),
    userAssociation.association.acronym,
    userAssociation.association.name,
    `${userAssociation.association.activated}`,
    userAssociation.id
  ])

export const getUserAssociationState = () => {
  const { data, ...rest } = associationSelector.getAssociations()

  return {
    ...rest,
    data: data.userAssociations
  }
}
