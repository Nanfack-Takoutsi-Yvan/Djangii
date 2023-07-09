import { tontinesActions } from "@services/store/slices/tontines"
import { getSavingsData } from "./methods"
import { savingsContributionTable, createData } from "./configs"

const savingsTontineConfigs: configs = {
  tables: [
    {
      name: "savings",
      table: savingsContributionTable
    }
  ],
  getData: getSavingsData,
  fetchData: tontinesActions.fetchTontineList,
  createData
}

export default savingsTontineConfigs
