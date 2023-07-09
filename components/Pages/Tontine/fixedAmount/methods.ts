import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getFixedAmountData = () => tontinesSelector.getAllTontines()

export const fixedAmountTableData = (tontines: ITontine[]) =>
  tontines
    .filter(tontine => tontine.type === "CONTRIBUTION")
    .map(tontine => [
      getDate(tontine.datation.creationTime),
      tontine.name,
      tontine.amount,
      `${tontine.periodicity.frequency} ${tontine.periodicity.value}`
    ])
