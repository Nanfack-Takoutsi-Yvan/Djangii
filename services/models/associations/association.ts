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

  static isUsernameAvailable = async (username: string) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to get association username information")

    await controller.isUsernameAvailable(token, username)
  }

  static inviteNewMember = async (payload: SingleMemberObj) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to invite new member")

    await controller.inviteMember(token, payload)
  }

  static updateMembership = async (payload: UpdateMemberObj) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to invite new member")

    await controller.updateMembership(token, payload)
  }

  static inviteVirtualMember = async (payload: VirtualMemberConfig) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to invite virtual member")

    await controller.inviteVirtualMember(token, payload)
  }

  static uploadNewMembersSheet = async (
    payload: ExcelMemberFile,
    associationId: string
  ) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to upload new members sheet")

    await controller.upLoadMembersSheet(token, payload, associationId)
  }
}
