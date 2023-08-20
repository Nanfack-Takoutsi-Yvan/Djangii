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
import eligibleAssociations, {
  fetchEligibleAssociations,
  getEligibleAssociations
} from "./eligibleAssociations"

export const associationActions = {
  fetchCreatedAssociation,
  fetchUserAssociations,
  fetchAssociationPages,
  fetchMembershipRequests,
  fetchEligibleAssociations
}

export const associationSelector = {
  getAssociations,
  getAssociationsPages,
  getAllMembershipRequest,
  getEligibleAssociations
}

export default {
  associations,
  associationsPages,
  membershipRequests,
  eligibleAssociations
}
