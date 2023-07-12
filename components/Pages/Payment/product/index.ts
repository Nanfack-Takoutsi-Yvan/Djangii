import { paymentActions } from "@services/store/slices/payment"
import { getProductsPaymentData } from "./methods"
import { productsPaymentTable, createData } from "./configs"

const productPaymentConfigs: configs = {
  tables: [
    {
      name: "productPayment",
      table: productsPaymentTable
    }
  ],
  getData: getProductsPaymentData,
  fetchData: paymentActions.fetchProductPaymentList,
  createData
}

export default productPaymentConfigs
