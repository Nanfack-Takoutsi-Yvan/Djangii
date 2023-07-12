import { configurationsActions } from "@services/store/slices/configurations"
import { getChargeLinesData } from "./methods"
import { createData, chargeLinesPageTable } from "./configs"

const chargeLineConfigs: configs = {
  tables: [
    {
      name: "chargeLine",
      table: chargeLinesPageTable
    }
  ],
  getData: getChargeLinesData,
  fetchData: configurationsActions.fetchChargeLines,
  createData
}

export default chargeLineConfigs
