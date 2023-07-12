import { paymentSelector } from "@services/store/slices/payment"
import { getDate } from "@services/utils/functions/format"

export const getAssistanceRequestData = () =>
  paymentSelector.getAllAssistanceRequest()

export const assistanceRequestsTableData = (
  assistanceRequests: IAssistanceRequest[]
) =>
  assistanceRequests.map(assistanceRequest => [
    getDate(assistanceRequest.date),
    assistanceRequest.assistanceLines?.[0].designation,
    assistanceRequest.assistanceLines?.[0].amount || 0,
    assistanceRequest.status,
    `${assistanceRequest.userInfos.firstName || 0} ${
      assistanceRequest.userInfos.lastName || 0
    }`,
    assistanceRequest.comments
  ])
