import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getSavingsData = () => tontinesSelector.getAllTontines()

export const savingsTableData = (tontines: ITontine[]) =>
  tontines
    .filter(tontine => tontine.type === "SAVING")
    .map(tontine => [
      getDate(tontine.datation.creationTime),
      tontine.name,
      tontine.interestAssociationPercent,
      tontine.interestRate,
      tontine.interestRefundFailPercent,
      tontine.maxAmountLoanPerMember,
      `${tontine.periodicity.frequency} ${tontine.periodicity.value}`,
      `${tontine.refundPeriodicity.frequency} ${tontine.refundPeriodicity.value}`
    ])
