import assert from "assert"
import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"

export default class Guarantee implements IGuarantee {
  id = ""

  observation = ""

  status = "" as GuaranteeStatus

  type = {} as IGuaranteeType

  value = 0

  constructor(guarantee?: IGuarantee) {
    if (guarantee) Object.assign(this, guarantee)
  }

  static async getGuarantees(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to guarantees list")

    const rawData = await controller.getGuaranteeTypeList(token, associationId)

    return rawData.content
  }

  static async createGuaranteeType(payload: GuaranteeTypePayload) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to create guarantees")

    const rawData = await controller.createGuaranteeTypes(token, payload)

    return rawData
  }
}
