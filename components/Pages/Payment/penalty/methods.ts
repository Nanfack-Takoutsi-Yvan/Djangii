import { paymentSelector } from "@services/store/slices/payment"
import { getDate } from "@services/utils/functions/format"

export const getPenaltiesPaymentData = () =>
  paymentSelector.getAllPenaltiesPayments()

export const penaltiesPaymentTableData = (
  penaltiesPayment: IPenaltyPayment[]
) =>
  penaltiesPayment.map(penaltyPayment => [
    getDate(penaltyPayment.datation.creationTime),
    `${penaltyPayment.userInfos.firstName} ${penaltyPayment.userInfos.lastName}`,
    penaltyPayment.details.designation,
    penaltyPayment.details?.amount || 0,
    penaltyPayment.details?.majoration,
    penaltyPayment.comments,
    penaltyPayment.status,
    getDate(penaltyPayment.datePaymentDelay)
  ])
