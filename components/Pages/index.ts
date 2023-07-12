import associationConfigs from "./Associations"
import associationMembersConfigs from "./Members"
import tontineConfigs from "./Tontine"
import loanConfigs from "./Loan"
import paymentConfigs from "./Payment"

const pages: Pages = {
  association: associationConfigs.association,
  pages: associationConfigs.associationsPages,
  membershipRequest: associationConfigs.membershipRequest,
  members: associationMembersConfigs.members,
  identities: undefined,
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
  penaltyType: undefined,
  chargesType: undefined,
  assistanceType: undefined,
  productType: undefined,
  sanctionedMembers: undefined,
  products: undefined,
  productPayment: paymentConfigs.product,
  chargeLine: undefined,
  charges: undefined,
  chargePayment: paymentConfigs.charges,
  assistance: undefined,
  assistanceRequest: paymentConfigs.assistanceRequest,
  warranties: undefined,
  sparingStates: tontineConfigs.contribution,
  advertisement: undefined,
  audience: undefined
}

export default pages
