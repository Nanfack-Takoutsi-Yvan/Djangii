/* eslint-disable import/prefer-default-export */
import TableActionButton from "@components/ui/TableActionButton"
import { getDate } from "@services/utils/functions/format"
import actions from "./actions"

export const formatDataTable = (associations: IAssociation[]) =>
  associations.map(association => [
    TableActionButton.bind(null, {
      onEdit: actions.edit,
      onView: actions.view
    }),
    getDate(association.datation.creationTime),
    association.acronym,
    association.name,
    `${association.activated}`
  ])
