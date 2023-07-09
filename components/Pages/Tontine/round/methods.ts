import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getTontineRoundData = () => tontinesSelector.getAllTontineRound()

export const tontineOpenedRoundTableData = (rounds: ITontineRound[]) =>
  rounds
    .filter(round => round.status === "OPENED")
    .map(round => [
      getDate(round.datation.creationTime),
      round.tontine.name,
      round.tontine.amount,
      round.noContributionPenalty?.amount || 0,
      round.tontine.interestAssociationPercent,
      round.tontine.interestRate,
      round.tontine.interestRefundFailPercent,
      round.tontine.maxAmountLoanPerMember,
      round.status
    ])

export const tontineClosedRoundTableData = (rounds: ITontineRound[]) =>
  rounds
    .filter(round => round.status === "CLOSED")
    .map(round => [
      getDate(round.datation.creationTime),
      round.tontine.name,
      round.tontine.amount,
      round.noContributionPenalty?.amount || 0,
      round.tontine.interestAssociationPercent,
      round.tontine.interestRate,
      round.tontine.interestRefundFailPercent,
      round.tontine.maxAmountLoanPerMember,
      round.status
    ])

export const tontineEndedRoundTableData = (rounds: ITontineRound[]) =>
  rounds
    .filter(round => round.status === "TERMINATED")
    .map(round => [
      getDate(round.datation.creationTime),
      round.tontine.name,
      round.tontine.amount,
      round.noContributionPenalty?.amount || 0,
      round.tontine.interestAssociationPercent,
      round.tontine.interestRate,
      round.tontine.interestRefundFailPercent,
      round.tontine.maxAmountLoanPerMember,
      round.status
    ])
