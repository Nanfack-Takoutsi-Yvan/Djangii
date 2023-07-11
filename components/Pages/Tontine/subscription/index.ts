import { tontinesActions } from "@services/store/slices/tontines"
import { getTontineSubscriptionData } from "./methods"
import { variableContributionTable } from "./configs"

const tontineSubscriptionConfigs: configs = {
  tables: [
    {
      name: "tontineSubscription",
      table: variableContributionTable
    }
  ],
  getData: getTontineSubscriptionData,
  fetchData: tontinesActions.fetchTontineSubscriptionList
}

export default tontineSubscriptionConfigs
