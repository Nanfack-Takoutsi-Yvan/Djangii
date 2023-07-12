import { paymentSelector } from "@services/store/slices/payment"
import { getDate } from "@services/utils/functions/format"

export const getProductsPaymentData = () =>
  paymentSelector.getAllProductsPayments()

export const productsPaymentTableData = (productsPayment: IProductPayment[]) =>
  productsPayment.map(penaltyPayment => [
    getDate(penaltyPayment.date),
    penaltyPayment.product.designation,
    penaltyPayment.product.amount,
    penaltyPayment.reference,
    penaltyPayment.reason,
    `${penaltyPayment.userInfos.firstName || ""} ${
      penaltyPayment.userInfos.lastName || ""
    }`,
    `${penaltyPayment.author.firstName || ""} ${
      penaltyPayment.author.lastName || ""
    }`
  ])
