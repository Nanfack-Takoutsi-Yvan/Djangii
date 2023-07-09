import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getVariableContributionsData = () =>
  tontinesSelector.getAllTontines()

export const variableContributionsTableData = (tontines: ITontine[]) =>
  tontines
    .filter(tontine => tontine.type === "VARIABLE_CONTRIBUTION")
    .map(tontine => [
      getDate(tontine.datation.creationTime),
      tontine.name,
      tontine.amount,
      `${tontine.periodicity.frequency} ${tontine.periodicity.value}`
    ])
