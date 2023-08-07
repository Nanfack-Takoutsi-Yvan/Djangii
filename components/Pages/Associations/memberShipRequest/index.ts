import { associationActions } from "@store/slices/associations"

import MembershipRequest from "@services/models/associations/membershipRequest"
import { getMembershipRequests } from "./methods"
import {
  acceptedMembershipRequestTable,
  pendingMembershipRequestTable,
  rejectedMembershipRequestTable
} from "./config"

const membershipRequestsConfigs: configs = {
  tables: [
    {
      name: "acceptedMembershipRequests",
      table: acceptedMembershipRequestTable
    },
    {
      name: "pendingMembershipRequests",
      table: pendingMembershipRequestTable,
      actions: [
        {
          name: "validate",
          method: () => null,
          pageAction: "validateMembershipRequest"
        },
        {
          name: "discard",
          method: async (data: any, id?: string) => {
            if (id) {
              await MembershipRequest.rejectMembershipRequest(id)
            }
          }
        }
      ]
    },
    {
      name: "rejectedMembershipRequests",
      table: rejectedMembershipRequestTable
    }
  ],
  getData: getMembershipRequests,
  fetchData: associationActions.fetchMembershipRequests
}

export default membershipRequestsConfigs
