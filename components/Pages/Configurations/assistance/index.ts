import { configurationsActions } from "@services/store/slices/configurations"
import { getAssistanceData } from "./methods"
import { createData, assistancePageTable } from "./configs"

const assistanceConfigs: configs = {
  tables: [
    {
      name: "assistance",
      table: assistancePageTable
    }
  ],
  getData: getAssistanceData,
  fetchData: configurationsActions.fetchAssistance,
  createData
}

export default assistanceConfigs
