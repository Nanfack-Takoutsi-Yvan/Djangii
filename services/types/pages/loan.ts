interface ILoan {
  amount: number
  author: IUserInfo
  authorCancel: IUserInfo
  authorRefund: IUserInfo
  beneficiary: IUserInfo
  datation: IHistory
  date: string
  dateLimitRefund: string
  dateRefund: string
  guarantees: IGuarantee
  guarantors: IGuarantors
  id: string
  interest: string
  interestBeneficiaries: ITontineRoundSubscription
  productAssociation: number
  status: LoanStatus
  tontineRound: ITontineRound
  transac: ITransac
}

type LoanStatus = "WAITING_REFUND" | "REFUNDED" | "CANCELED"

interface IGuarantors {
  amountSupported: number
  datation: IHistory
  id: string
  member: IUserInfo
}

interface IGuarantee {
  id: string
  observation: string
  status: GuaranteeStatus
  type: IGuaranteeType
  value: number
}

type GuaranteeStatus = "SEIZED" | "RETURNED" | "SAVED"

interface IGuaranteeType {
  association: IAssociation
  datation: IHistory
  description: string
  designation: string
  id: string
}

interface ILoanRequestBody {
  amount: number
  dateLimitRefund: string
  guarantees: IGuarantee
  guarantors: IGuarantors
  interest: number
  tontineRoundId: string
  userInfosId: string
}

interface ILoanController {
  getLoanList: (
    token: string,
    associationId: string,
    status?: LoanStatus
  ) => Promise<ILoanResponse>
}
