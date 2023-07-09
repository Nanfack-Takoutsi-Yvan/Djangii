import { tontinesActions } from "@services/store/slices/tontines"
import { getVariableContributionsData } from "./methods"
import { variableContributionTable, createData } from "./configs"

const variableAmountTontineConfigs: configs = {
  tables: [
    {
      name: "variableAmount",
      table: variableContributionTable
    }
  ],
  getData: getVariableContributionsData,
  fetchData: tontinesActions.fetchTontineList,
  createData
}

export default variableAmountTontineConfigs
