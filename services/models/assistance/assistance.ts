import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Assistance implements IAssistanceLine {
  amount = 0

  association = {} as IAssociation

  contition = ""

  datation = {} as IHistory

  designation = ""

  id = ""

  memo = ""

  periodicity = {} as ITontinePeriodicity

  constructor(assistance?: IAssistanceLine) {
    if (assistance) {
      Object.assign(this, assistance)
    }
  }

  static async getAssistanceList(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to assistance request list")

    const rawData = await controller.getAssistanceTypeList(token, associationId)

    return rawData.content
  }

  static async createAssistanceType(payload: IAssistanceLineRequestBody) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to create assistance type")

    const rawData = await controller.createAssistanceTypes(token, payload)

    return rawData
  }
}
