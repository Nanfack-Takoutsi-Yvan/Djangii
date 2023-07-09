import TontineController from "@services/controller/tontines.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class TontineRound implements ITontineRound {
  amountAvailableForLoan = ""

  associationParticiped = ""

  compteHBTontineAss = ""

  compteTontineAss = ""

  compteTontineMemAss = ""

  datation = {} as IHistory

  dateEnd = ""

  dateStart = ""

  id = ""

  interestAssociationPercent = 0

  interestRate = 0

  interestRefundFailPercent = 0

  latePenalty = {} as IAssociationPenalty

  maxAmountLoanPerMember = 0

  noContributionPenalty = {} as IAssociationPenalty

  refundPeriodicity = {} as ITontinePeriodicity

  status = "OPENED" as TontineRoundStatus

  tontine = {} as ITontine

  constructor(tontine: ITontineRound) {
    if (tontine) {
      Object.assign(this, tontine)
    }
  }

  static async getTontinesRounds(
    associationId: string,
    status?: TontineRoundStatus
  ) {
    const token = await getTokenFromStorage()
    const controller = new TontineController()

    assert(token, "Token is required to fetch tontine list")

    const rawData = await controller.getTontineRoundList(
      token,
      associationId,
      status
    )

    return rawData.content
  }
}
