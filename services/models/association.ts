import { AssociationController } from "@services/controller/association.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Association implements IAssociation {
  id = ""

  acronym = ""

  activated = false

  creator = {} as IUserInfo

  currency = {} as ICurrency

  datation = {} as IHistory

  latitude = 0

  longitude = 0

  name = ""

  private controller = new AssociationController()

  constructor(association?: IAssociation) {
    if (association) {
      Object.assign(this, association)
    }
  }

  static getAssociations = async () => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()
    const associations: IAssociation[] = []

    assert(token, "token is required")

    const rawData = await controller.getAssociations(token, "full")

    rawData.content.map(data => associations.push(data))

    return associations
  }
}