import { getDate } from "@services/utils/functions/format"
import { associationSelector } from "@store/slices/associations"

export const associationsPagesData = (associationsPages: IAssociationPage[]) =>
  associationsPages.map(associationPage => [
    getDate(associationPage.datation.creationTime),
    associationPage.association.name,
    associationPage.name,
    `${associationPage.isPublic ? "public" : "private"}`,
    associationPage.description,
    associationPage.id
  ])

export const getAssociationsPages = () =>
  associationSelector.getAssociationsPages()
