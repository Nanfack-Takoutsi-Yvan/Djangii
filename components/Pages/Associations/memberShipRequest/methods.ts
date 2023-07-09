import { getDate } from "@services/utils/functions/format"
import { associationSelector } from "@store/slices/associations"

export const acceptedMembershipRequestData = (
  membershipRequests: IMembershipRequest[]
) =>
  membershipRequests
    .filter(membershipRequest => membershipRequest.accepted)
    .map(membershipRequest => [
      getDate(membershipRequest.datation.creationTime),
      membershipRequest.firstName,
      membershipRequest.lastName,
      membershipRequest.alias,
      membershipRequest.associationPage.name,
      membershipRequest.associationPage.association.name,
      membershipRequest.requestMotivation
    ])

export const rejectedMembershipRequestData = (
  membershipRequests: IMembershipRequest[]
) =>
  membershipRequests
    .filter(membershipRequest => membershipRequest.rejected)
    .map(membershipRequest => [
      getDate(membershipRequest.datation.creationTime),
      membershipRequest.firstName,
      membershipRequest.lastName,
      membershipRequest.alias,
      membershipRequest.associationPage.name,
      membershipRequest.associationPage.association.name,
      membershipRequest.requestMotivation
    ])

export const pendingMembershipRequestData = (
  membershipRequests: IMembershipRequest[]
) =>
  membershipRequests
    .filter(membershipRequest => membershipRequest.pending)
    .map(membershipRequest => [
      getDate(membershipRequest.datation.creationTime),
      membershipRequest.firstName,
      membershipRequest.lastName,
      membershipRequest.alias,
      membershipRequest.associationPage.name,
      membershipRequest.associationPage.association.name,
      membershipRequest.requestMotivation
    ])

export const getMembershipRequests = () =>
  associationSelector.getAllMembershipRequest()
