import { tontinesActions } from "@services/store/slices/tontines"
import { getFixedAmountData } from "./methods"
import { fixedAmountContributionTable, createData } from "./configs"

const fixedAmountTontineConfigs: configs = {
  tables: [
    {
      name: "fixedAmount",
      table: fixedAmountContributionTable
    }
  ],
  getData: getFixedAmountData,
  fetchData: tontinesActions.fetchTontineList,
  createData
}

export default fixedAmountTontineConfigs
