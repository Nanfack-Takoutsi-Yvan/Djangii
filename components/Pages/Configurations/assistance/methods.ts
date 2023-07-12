import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getAssistanceData = () => configurationsSelector.getAllAssistance()

export const assistanceDataTables = (penalties: IAssistanceLine[]) =>
  penalties.map(penalty => [
    getDate(penalty.datation.creationTime),
    penalty.designation,
    penalty.amount,
    penalty.contition,
    penalty.memo,
    `${penalty.periodicity.frequency} ${penalty.periodicity.value}`
  ])
