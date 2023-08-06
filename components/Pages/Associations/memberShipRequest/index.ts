import { associationActions } from "@store/slices/associations"

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
          method: (data: IUserAssociation[]) => null
        },
        {
          name: "discard",
          method: (data: IUserAssociation[]) => null
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
