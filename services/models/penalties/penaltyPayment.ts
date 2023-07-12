import PaymentController from "@services/controller/payments.controller"
import TontineController from "@services/controller/tontines.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class PenaltyPayment implements IPenaltyPayment {
  amount = 0

  canceled = false

  comments = ""

  datation = {} as IHistory

  date = ""

  datePaymentDelay = ""

  details = {} as PenaltyDetails

  expired = false

  id = ""

  paid = false

  status = {} as PenaltyStatus

  tontineSession = {} as ITontineSession

  unPaid = false

  userInfos = {} as IUserInfo

  constructor(penaltyPayment?: IPenaltyPayment) {
    if (penaltyPayment) {
      Object.assign(this, penaltyPayment)
    }
  }

  static async getPenaltyPaymentList(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to penalty payment list")

    const rawData = await controller.getPenaltiesList(token, associationId)

    return rawData.content
  }
}
