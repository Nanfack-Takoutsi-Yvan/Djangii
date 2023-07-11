/* eslint-disable max-classes-per-file */
import { AssociationController } from "@services/controller/association.controller"

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
}
