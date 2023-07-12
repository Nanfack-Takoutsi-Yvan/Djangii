import { paymentActions } from "@services/store/slices/payment"
import { getPenaltiesPaymentData } from "./methods"
import { penaltiesPaymentTable, createData } from "./configs"

const penaltyPaymentConfigs: configs = {
  tables: [
    {
      name: "penaltyPayment",
      table: penaltiesPaymentTable
    }
  ],
  getData: getPenaltiesPaymentData,
  fetchData: paymentActions.fetchPenaltyPaymentList,
  createData
}

export default penaltyPaymentConfigs
