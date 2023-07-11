import LoanController from "@services/controller/loan.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Loan implements ILoan {
  amount = 0

  author = {} as IUserInfo

  authorCancel = {} as IUserInfo

  authorRefund = {} as IUserInfo

  beneficiary = {} as IUserInfo

  datation = {} as IHistory

  date = ""

  dateLimitRefund = ""

  dateRefund = ""

  guarantees = {} as IGuarantee

  guarantors = {} as IGuarantors

  id = ""

  interest = ""

  interestBeneficiaries = {} as ITontineRoundSubscription

  productAssociation = 0

  status = {} as LoanStatus

  tontineRound = {} as ITontineRound

  transac = {} as ITransac

  private controler = new LoanController()

  constructor(loan?: ILoan) {
    if (loan) {
      Object.assign(this, loan)
    }
  }

  static async getLoanList(associationId: string, status?: LoanStatus) {
    const token = await getTokenFromStorage()
    const controller = new LoanController()

    assert(token, "Token is required to fetch loans list")

    const rawData = await controller.getLoanList(token, associationId, status)

    return rawData.content
  }
}
