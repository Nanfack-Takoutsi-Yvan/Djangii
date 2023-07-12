import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getPenaltiesData = () =>
  configurationsSelector.getAllPenaltiesTypes()

export const penaltiesDataTables = (penalties: IAssociationPenalty[]) =>
  penalties.map(penalty => [
    getDate(penalty.datation.creationTime),
    penalty.designation,
    penalty.amount,
    penalty.majoration,
    penalty.description
  ])
