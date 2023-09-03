import PaymentController from "@services/controller/payments.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class ChargePayment implements IChargePayment {
  amount = ""

  author = {} as IUserInfo

  charge = {} as ICharge

  datation = {} as IHistory

  date = ""

  id = ""

  paymentExecutor = {} as IUserInfo

  reason = ""

  reference = ""

  constructor(chargePayment?: IChargePayment) {
    if (chargePayment) {
      Object.assign(this, chargePayment)
    }
  }

  static async getChargePaymentList(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to charge payment list")

    const rawData = await controller.getChargePaymentList(token, associationId)

    return rawData.content
  }

  static async saveChargePayment(payload: IChargePaymentRequestBody) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to save charge payment list")

    const rawData = await controller.saveChargePayment(token, payload)

    return rawData
  }
}
