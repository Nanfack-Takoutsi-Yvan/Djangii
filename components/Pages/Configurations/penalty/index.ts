import { configurationsActions } from "@services/store/slices/configurations"
import { getPenaltiesData } from "./methods"
import { createData, penaltiesTypesPageTable } from "./configs"

const penaltiesTypesConfigs: configs = {
  tables: [
    {
      name: "penaltiesTypes",
      table: penaltiesTypesPageTable
    }
  ],
  getData: getPenaltiesData,
  fetchData: configurationsActions.fetchPenaltiesTypes,
  createData
}

export default penaltiesTypesConfigs
