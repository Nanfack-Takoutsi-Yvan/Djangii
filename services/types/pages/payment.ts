interface IChargePayment {
  amount: string
  author: IUserInfo
  charge: ICharge
  datation: IHistory
  date: string
  id: string
  paymentExecutor: IUserInfo
  reason: string
  reference: string
}

interface IChargePaymentRequestBody {
  amount: number
  chargeId: string
  date: string
  reason: string
  reference: string
  userInfosId: string
}

interface IProductPayment {
  amount: number
  author: IUserInfo
  datation: IHistory
  date: string
  id: string
  product: IProduct
  reason: string
  reference: string
  userInfos: IUserInfo
}

interface ProductPaymentRequestBody {
  amount: number
  date: string
  productId: string
  reason: string
  reference: string
  userInfosIds: string[]
}

interface IPaymentController {
  getPenaltiesList: (
    token: string,
    associationID: string
  ) => Promise<IPenaltyListContent>
  getProductPaymentList: (
    token: string,
    associationId: string
  ) => Promise<IProductPaymentListContent>
  getChargePaymentList: (
    token: string,
    associationId: string
  ) => Promise<IChargePaymentContent>
  getAssistanceRequestList: (
    token: string,
    associationId: string
  ) => Promise<IAssistanceRequestContent>
}
