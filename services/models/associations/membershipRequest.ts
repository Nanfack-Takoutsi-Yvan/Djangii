import { AssociationController } from "@services/controller/association.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class MembershipRequest implements IMembershipRequest {
  id = ""

  firstName = ""

  lastName = ""

  status = ""

  requestMotivation = ""

  associationPage = {} as IAssociationPage

  transmitter = {} as ITransmitter

  alias = ""

  datation = {} as IHistory

  accepted = false

  rejected = false

  pending = false

  private controller = new AssociationController()

  constructor(request?: IMembershipRequest) {
    if (request) {
      Object.assign(this, request)
    }
  }

  static async getAllMembershipRequest() {
    const token = await getTokenFromStorage()
    const controller = new AssociationController()
    const membershipRequests: IMembershipRequest[] = []

    assert(token, "token is required")
    const res = await controller.getAllMembershipRequest(token)

    res.content.map(membershipRequest =>
      membershipRequests.push(membershipRequest)
    )

    return membershipRequests
  }
}
