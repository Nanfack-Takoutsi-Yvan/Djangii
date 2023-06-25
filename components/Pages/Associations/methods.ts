import { getDate } from "@services/utils/functions/format"

export const manageableAssociationsDataTable = (
  associations: IAssociation[],
  filter?: string
) =>
  associations
    .filter(association => {
      if (!filter) return true

      return association.creator.id === filter
    })
    .map(association => [
      getDate(association.datation.creationTime),
      association.acronym,
      association.name,
      `${association.activated}`
    ])

export const joinedAssociationsDataTable = (associations: IAssociation[]) =>
  associations.map(association => [
    getDate(association.datation.creationTime),
    association.acronym,
    association.name,
    `${association.activated}`
  ])
