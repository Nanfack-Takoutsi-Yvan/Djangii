import assert from "assert"
import { AssociationController } from "@services/controller/association.controller"
import getTokenFromStorage from "@services/utils/functions/token"

import Association from "./association"

export default class UserAssociation implements IUserAssociation {
  id = ""

  firstName = ""

  lastName = ""

  numero = 0

  userInfo = {} as IUserInfo

  role = "UNDEFINED" as IUserRole

  type = ""

  dateJoinAssociation = ""

  association = new Association()

  author = {} as IUserInfo

  datation = {} as IHistory

  private controller = new AssociationController()

  constructor(association?: IAssociation) {
    if (association) {
      Object.assign(this, association)
    }
  }

  static getUserAssociations = async () => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()
    const associations: IUserAssociation[] = []

    assert(token, "token is required")

    const rawData = await controller.getAssociations(token, "full")

    rawData.map(data => associations.push(data))

    return associations
  }

  static getCreatedAssociations = async () => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()
    const associations: IAssociation[] = []

    assert(token, "token is required")

    const rawData = await controller.getCreatedAssociations(token, "full")

    rawData.content.map(data => associations.push(data))

    return associations
  }

  static getAllAssociationMembers = async (id: string) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required")

    const rawData = await controller.getAllAssociationMembers(token, id)

    return rawData.content
  }

  static isUserInDjangii = async (query: string) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to get email info")

    const rawData = await controller.isUserInDjangii(token, query)

    return rawData
  }
}
