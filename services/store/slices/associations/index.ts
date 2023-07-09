import associations, {
  fetchCreatedAssociation,
  fetchUserAssociations,
  getAssociations
} from "./associations"
import associationsPages, {
  fetchAssociationPages,
  getAssociationsPages
} from "./associationsPages"
import membershipRequests, {
  fetchMembershipRequests,
  getAllMembershipRequest
} from "./membershipRequests"

export const associationActions = {
  fetchCreatedAssociation,
  fetchUserAssociations,
  fetchAssociationPages,
  fetchMembershipRequests
}

export const associationSelector = {
  getAssociations,
  getAssociationsPages,
  getAllMembershipRequest
}

export default {
  associations,
  associationsPages,
  membershipRequests
}
