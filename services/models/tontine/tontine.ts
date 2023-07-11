import TontineController from "@services/controller/tontines.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Tontine implements ITontine {
  amount = 0

  association = {} as IAssociation

  datation = {} as IHistory

  id = ""

  interestAssociationPercent = 0

  interestRate = 0

  interestRefundFailPercent = 0

  maxAmountLoanPerMember = 0

  name = ""

  type = "CONTRIBUTION" as TontineType

  periodicity = {} as ITontinePeriodicity

  refundPeriodicity = {} as ITontinePeriodicity

  constructor(tontine?: ITontine) {
    if (tontine) {
      Object.assign(this, tontine)
    }
  }

  static async getTontineList(associationId: string, type?: TONTINE_TYPE) {
    const token = await getTokenFromStorage()
    const controller = new TontineController()

    assert(token, "Token is required to fetch tontine list")

    const rawData = await controller.getTontineList(token, associationId, type)

    return rawData.content
  }
}
