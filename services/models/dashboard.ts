import DashboardController from "@services/controller/dashboard.controller"
import getTokenFromStorage from "@utils/functions/token"
import assert from "assert"

export default class Dashboard implements IDashboardData {
  associationCreatedTotal = 0

  associationManagedTotal = 0

  contributionCurve: Curve[] = []

  contributionVolume = 0

  memberAssociationCurve: Curve[] = []

  memberAssociationTotal = 0

  penaltyUnpaidTotal = 0

  tontineCurve: Curve[] = []

  tontineRoundCurve: Curve[] = []

  tontineRoundOpenedTotal = 0

  tontineSessionProgrammedTotal = 0

  tontineTotal = 0

  private controller = ""

  constructor(data: IDashboardData) {
    if (data) {
      Object.assign(this, data)
    }
  }

  static getData = async (id: string) => {
    const token = await getTokenFromStorage()

    assert(id, "Association id is required to get data")
    assert(token, "User needs to be authenticated to access curve data")

    const controller = new DashboardController()

    const dashboardData = await controller.getCurveData(id, token)

    return new Dashboard(dashboardData)
  }
}
