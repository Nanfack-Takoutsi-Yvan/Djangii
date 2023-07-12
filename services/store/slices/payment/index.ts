import assistanceRequest, {
  fetchAssistanceRequest,
  getAllAssistanceRequest
} from "./assistanceRequest"
import chargePayment, {
  fetchChargePayment,
  getAllChargePayment
} from "./chargePayment"
import penaltyPayment, {
  fetchPenaltyPaymentList,
  getAllPenaltiesPayments
} from "./penaltyPayment"
import productPayment, {
  fetchProductPaymentList,
  getAllProductsPayments
} from "./productPayment"

export const paymentActions = {
  fetchAssistanceRequest,
  fetchChargePayment,
  fetchPenaltyPaymentList,
  fetchProductPaymentList
}

export const paymentSelector = {
  getAllAssistanceRequest,
  getAllChargePayment,
  getAllPenaltiesPayments,
  getAllProductsPayments
}

export default {
  assistanceRequest,
  chargePayment,
  penaltyPayment,
  productPayment
}
