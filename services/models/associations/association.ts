/* eslint-disable max-classes-per-file */
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

  static createAssociation = async (association: INewAssociation) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to create associations")

    const rawData = await controller.createAssociation(token, association)
    return rawData.content
  }
}
