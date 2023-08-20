import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Penalty implements IAssociationPenalty {
  amount = 0

  association = {} as IAssociation

  datation = {} as IHistory

  description = ""

  designation = ""

  id = ""

  majoration = 0

  percent = false

  constructor(penalty?: IAssociationPenalty) {
    if (penalty) {
      Object.assign(this, penalty)
    }
  }

  static async getPenalties(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to penalty payment list")

    const rawData = await controller.getPenaltyTypesList(token, associationId)

    return rawData.content
  }

  static async createPenaltyType(payload: IAssociationPenaltyRequestBody) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to create penalty type")

    const rawData = await controller.createPenaltyTypes(token, payload)
    return rawData
  }
}
