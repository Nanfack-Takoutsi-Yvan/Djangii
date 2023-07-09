import TontineController from "@services/controller/tontines.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class TontineSession implements ITontineSession {
  beneficiaries = {} as ITontineSessionBeneficiary

  closureNotes = ""

  datation = {} as IHistory

  date = ""

  id = ""

  jackpot = 0

  roundReserve = 0

  status = "OPENED" as TontineSessionStatus

  tontineRound = {} as ITontineRound

  transac = {} as ITransac

  constructor(session?: ITontineSession) {
    if (session) {
      Object.assign(this, session)
    }
  }

  static async getTontineRoundSessionList(
    associationId: string,
    status?: TontineSessionStatus
  ) {
    const token = await getTokenFromStorage()
    const controller = new TontineController()

    assert(token, "Token is required to fetch tontine sessions list")

    const rawData = await controller.getTontineSessionsList(
      token,
      associationId,
      status
    )

    return rawData.content
  }
}
