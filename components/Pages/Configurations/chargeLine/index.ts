import { configurationsActions } from "@services/store/slices/configurations"
import { getChargeTypesData } from "./methods"
import { createData, chargeTypesPageTable } from "./configs"

const chargeTypesConfigs: configs = {
  tables: [
    {
      name: "chargeTypes",
      table: chargeTypesPageTable
    }
  ],
  getData: getChargeTypesData,
  fetchData: configurationsActions.fetchChargeTypes,
  createData
}

export default chargeTypesConfigs
