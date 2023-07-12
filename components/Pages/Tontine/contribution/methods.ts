import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getTontineSubscriptionData = () =>
  tontinesSelector.getAllTontineSubscription()

export const contributionsData = (contributions: ITontineRoundSubscription[]) =>
  contributions.map(contribution => [
    getDate(contribution.tontineRound.dateStart),
    contribution.tontineRound.tontine.name,
    contribution.tontineRound.tontine.association.name
  ])
