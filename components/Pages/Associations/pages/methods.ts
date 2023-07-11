import { getDate } from "@services/utils/functions/format"
import { associationSelector } from "@store/slices/associations"

export const associationsPagesData = (associationsPages: IAssociationPage[]) =>
  associationsPages.map(associationPage => [
    getDate(associationPage.datation.creationTime),
    associationPage.association.name,
    associationPage.name,
    `${associationPage.isPublic ? "public" : "private"}`,
    `${associationPage.visible ? "yes" : "no"}`,
    associationPage.description
  ])

export const getAssociationsPages = () =>
  associationSelector.getAssociationsPages()
