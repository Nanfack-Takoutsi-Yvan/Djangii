import { paymentSelector } from "@services/store/slices/payment"
import { getDate } from "@services/utils/functions/format"

export const getChargePaymentData = () => paymentSelector.getAllChargePayment()

export const chargePaymentTableData = (charges: IChargePayment[]) =>
  charges.map(charge => [
    getDate(charge.date),
    charge.charge.designation,
    charge.charge?.amount || 0,
    charge.reference,
    charge.reason,
    `${charge.paymentExecutor.firstName || ""} ${
      charge.paymentExecutor.lastName || ""
    }`
  ])
