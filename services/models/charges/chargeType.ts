import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class ChargeType implements ICharge {
  amount = 0

  chargeLines = []

  datation = {} as IHistory

  description = ""

  designation = ""

  id = ""

  constructor(chargeType?: ICharge) {
    if (chargeType) {
      Object.assign(this, chargeType)
    }
  }

  static async getChargeTypes(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to charges types list")

    const rawData = await controller.getChargeTypesList(token, associationId)

    return rawData.content
  }
}
