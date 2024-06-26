import associationConfigs from "./Associations"
import associationMembersConfigs from "./Members"
import tontineConfigs from "./Tontine"
import loanConfigs from "./Loan"
import paymentConfigs from "./Payment"
import configurationsConfigs from "./Configurations"
import advertisingConfigs from "./Advertising"

const pages: Pages = {
  association: associationConfigs.association,
  pages: associationConfigs.associationsPages,
  membershipRequest: associationConfigs.membershipRequest,
  members: associationMembersConfigs.members,
  identities: associationMembersConfigs.identity,
  fixedAmount: tontineConfigs.fixedAmount,
  variableAmount: tontineConfigs.variableAmount,
  savings: tontineConfigs.savings,
  tontineTurn: tontineConfigs.rounds,
  mySubscriptions: tontineConfigs.subscriptions,
  sessions: tontineConfigs.sessions,
  pendingLoans: loanConfigs.pending,
  paidLoans: loanConfigs.paid,
  canceledLoans: loanConfigs.cancel,
  penalties: paymentConfigs.penalty,
  penaltyType: configurationsConfigs.penalty,
  chargesType: configurationsConfigs.chargeType,
  assistanceType: configurationsConfigs.assistance,
  productType: configurationsConfigs.product,
  products: configurationsConfigs.product,
  productPayment: paymentConfigs.product,
  chargeLine: configurationsConfigs.chargeLine,
  charges: configurationsConfigs.chargeType,
  chargePayment: paymentConfigs.charges,
  assistance: configurationsConfigs.assistance,
  assistanceRequest: paymentConfigs.assistanceRequest,
  warranties: configurationsConfigs.guarantee,
  sparingStates: tontineConfigs.contribution,
  advertisement: advertisingConfigs.advertising,
  audience: advertisingConfigs.audience
}

export default pages
