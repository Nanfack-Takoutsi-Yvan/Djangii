/* eslint-disable max-classes-per-file */
import { AssociationController } from "@services/controller/association.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class AssociationPage implements IAssociationPage {
  association = {} as IAssociation

  author = {} as IUserInfo

  avatar = {} as IDjangiiFile

  coverPicture = {} as IDjangiiFile

  datation = {} as IHistory

  description = ""

  email = ""

  id = ""

  isPublic = true

  links = {} as IExternalLink[]

  name = ""

  phone = ""

  username = ""

  visible = true

  private controller = new AssociationController()

  constructor(associationPage?: IAssociationPage) {
    if (associationPage) {
      Object.assign(this, associationPage)
    }
  }

  static getAllAssociationPages = async () => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to get all associations pages")

    const rawData = await controller.getAllAssociationPages(token)
    return rawData.content
  }

  static createAssociationPages = async (
    associationPage: INewAssociationPage
  ) => {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()

    assert(token, "token is required to create associations pages")

    const newAssociation = await controller.createAssociationPage(
      token,
      associationPage
    )
    return newAssociation
  }
}
