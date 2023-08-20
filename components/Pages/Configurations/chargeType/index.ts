import { configurationsActions } from "@services/store/slices/configurations"
import { getChargeLinesData } from "./methods"
import { createData, chargeLinesPageTable } from "./configs"

const chargeTypeConfigs: configs = {
  tables: [
    {
      name: "chargeLine",
      table: chargeLinesPageTable
    }
  ],
  getData: getChargeLinesData,
  fetchData: configurationsActions.fetchChargeTypes,
  createData
}

export default chargeTypeConfigs
