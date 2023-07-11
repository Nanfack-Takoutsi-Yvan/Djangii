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
  userInfosId: string
  userInfosIds: string[]
}
