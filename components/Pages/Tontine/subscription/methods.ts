import { tontinesSelector } from "@services/store/slices/tontines"
import { getDate } from "@services/utils/functions/format"

export const getTontineSubscriptionData = () =>
  tontinesSelector.getAllTontineSubscription()

export const subscriptionContributionData = (
  subscriptions: ITontineRoundSubscription[]
) =>
  subscriptions.map(subscription => [
    getDate(subscription.datation.creationTime),
    `${getDate(subscription.tontineRound.dateStart)} - ${getDate(
      subscription.tontineRound.dateEnd
    )}`,
    subscription.tontineRound.tontine.association.name,
    subscription.tontineRound.tontine.name,
    subscription.tontineRound.tontine.amount,
    subscription.tontineRound.tontine.maxAmountLoanPerMember,
    `${subscription.tontineRound.tontine.periodicity.frequency} ${subscription.tontineRound.tontine.periodicity.value}`,
    subscription.totalBeneficiary,
    subscription.tontineRound.status
  ])
