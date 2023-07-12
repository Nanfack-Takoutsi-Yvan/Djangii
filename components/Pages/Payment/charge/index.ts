import { paymentActions } from "@services/store/slices/payment"
import { getChargePaymentData } from "./methods"
import { chargePaymentTable, createData } from "./configs"

const chargePaymentConfigs: configs = {
  tables: [
    {
      name: "chargePayment",
      table: chargePaymentTable
    }
  ],
  getData: getChargePaymentData,
  fetchData: paymentActions.fetchChargePayment,
  createData
}

export default chargePaymentConfigs
