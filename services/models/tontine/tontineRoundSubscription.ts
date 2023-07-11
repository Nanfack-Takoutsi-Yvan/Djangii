import TontineController from "@services/controller/tontines.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class TontineRoundSubscription
  implements ITontineRoundSubscription
{
  balance = ""

  compteTontine = {} as ICompte

  datation = {} as IHistory

  id = ""

  interestGenerated = ""

  tontineRound = {} as ITontineRound

  totalBeneficiary = 0

  totalContributions = 0

  userInfos = {} as IUserInfo

  constructor(subscription?: ITontineRoundSubscription) {
    if (subscription) {
      Object.assign(this, subscription)
    }
  }

  static async getTontineRoundSubscriptionList() {
    const token = await getTokenFromStorage()
    const controller = new TontineController()

    assert(token, "Token is required to fetch tontine round subscription list")

    const rawData = await controller.getMySubscriptionsList(token)

    return rawData.content
  }
}
