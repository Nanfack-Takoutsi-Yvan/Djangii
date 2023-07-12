import PaymentController from "@services/controller/payments.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class AssistanceRequest implements IAssistanceRequest {
  association = {} as IAssociation

  datation = {} as IHistory

  id = ""

  amount = 0

  assistanceLines = {} as IAssistanceLine

  comments = ""

  date = ""

  userInfos = {} as IUserInfo

  status = {} as AssistanceRequestBodyStatus

  constructor(assistanceRequest?: IAssistanceRequest) {
    if (assistanceRequest) {
      Object.assign(this, assistanceRequest)
    }
  }

  static async getAssistanceRequestList(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to assistance request list")

    const rawData = await controller.getAssistanceRequestList(
      token,
      associationId
    )

    return rawData.content
  }
}
