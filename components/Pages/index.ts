import associationConfigs from "./Associations"
import associationMembersConfigs from "./Members"
import tontineConfigs from "./Tontine"
import loanConfigs from "./Loan"

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
  penaltyType: undefined,
  sanctionedMembers: undefined,
  products: undefined,
  productPayment: undefined,
  chargeLine: undefined,
  charges: undefined,
  chargePayment: undefined,
  assistance: undefined,
  assistanceRequest: undefined,
  warranties: undefined,
  sparingStates: undefined,
  advertisement: undefined,
  audience: undefined
}

export default pages
