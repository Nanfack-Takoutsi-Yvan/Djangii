import fixedAmountTontineConfigs from "./fixedAmount"
import variableAmountTontineConfigs from "./variableAmount"
import savingsTontineConfigs from "./savings"
import tontineRoundConfigs from "./round"
import tontineSessionsConfigs from "./session"
import tontineSubscriptionConfigs from "./subscription"
import tontineContributionConfigs from "./contribution"

export default {
  fixedAmount: fixedAmountTontineConfigs,
  variableAmount: variableAmountTontineConfigs,
  savings: savingsTontineConfigs,
  rounds: tontineRoundConfigs,
  sessions: tontineSessionsConfigs,
  subscriptions: tontineSubscriptionConfigs,
  contribution: tontineContributionConfigs
}
