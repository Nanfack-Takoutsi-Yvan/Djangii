import { paymentActions } from "@services/store/slices/payment"
import { getAssistanceRequestData } from "./methods"
import { assistanceRequestTable, createData } from "./configs"

const assistanceRequestConfigs: configs = {
  tables: [
    {
      name: "assistanceRequest",
      table: assistanceRequestTable
    }
  ],
  getData: getAssistanceRequestData,
  fetchData: paymentActions.fetchAssistanceRequest,
  createData
}

export default assistanceRequestConfigs
