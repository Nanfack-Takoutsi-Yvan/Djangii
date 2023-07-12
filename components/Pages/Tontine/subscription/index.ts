import { tontinesActions } from "@services/store/slices/tontines"
import { getTontineSubscriptionData } from "./methods"
import { subscriptionContributionDataTable } from "./configs"

const tontineSubscriptionConfigs: configs = {
  tables: [
    {
      name: "tontineSubscription",
      table: subscriptionContributionDataTable
    }
  ],
  getData: getTontineSubscriptionData,
  fetchData: tontinesActions.fetchTontineSubscriptionList
}

export default tontineSubscriptionConfigs
