import associationConfigs from "./Associations"
import associationMembersConfigs from "./Members"
import tontineConfigs from "./Tontine"

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
  mySubscriptions: undefined,
  sessions: undefined,
  pendingLoans: undefined,
  paidLoans: undefined,
  canceledLoans: undefined,
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
