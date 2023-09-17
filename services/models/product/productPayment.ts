import PaymentController from "@services/controller/payments.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class ProductPayment implements IProductPayment {
  amount = 0

  author = {} as IUserInfo

  datation = {} as IHistory

  date = ""

  id = ""

  product = {} as IProduct

  reason = ""

  reference = ""

  userInfos = {} as IUserInfo

  constructor(productPayment?: IProductPayment) {
    if (productPayment) {
      Object.assign(this, productPayment)
    }
  }

  static async getProductPaymentList(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to product payment list")

    const rawData = await controller.getProductPaymentList(token, associationId)

    return rawData.content
  }

  static async saveProductPayment(payload: ProductPaymentRequestBody) {
    const token = await getTokenFromStorage()
    const controller = new PaymentController()

    assert(token, "Token is required to save a product payment")

    const rawData = await controller.saveProductPayment(token, payload)

    return rawData
  }
}
