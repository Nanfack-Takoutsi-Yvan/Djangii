import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Charge implements ChargeLine {
  association = {} as IAssociation

  datation = {} as IHistory

  designation = ""

  id = ""

  constructor(charge?: ChargeLine) {
    if (charge) {
      Object.assign(this, charge)
    }
  }

  static async getCharges(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to chargeLines list")

    const rawData = await controller.getChargeLineList(token, associationId)

    return rawData.content
  }
}
