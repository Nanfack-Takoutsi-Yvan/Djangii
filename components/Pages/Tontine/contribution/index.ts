import { tontinesActions } from "@services/store/slices/tontines"
import { getTontineSubscriptionData } from "./methods"
import { contributionTable } from "./configs"

const tontineContributionConfigs: configs = {
  tables: [
    {
      name: "tontineContribution",
      table: contributionTable
    }
  ],
  getData: getTontineSubscriptionData,
  fetchData: tontinesActions.fetchTontineSubscriptionList
}

export default tontineContributionConfigs
