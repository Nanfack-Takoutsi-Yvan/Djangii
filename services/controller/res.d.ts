type IAssociationDataContent = PageableData & { content: IAssociation[] }
type IAssociationPagesContent = PageableData & { content: IAssociationPage[] }
type IAssociationMemberContent = PageableData & { content: IUserAssociation[] }
type ITontineSessionContent = PageableData & { content: ITontineSession[] }
type ITontineRoundContent = PageableData & { content: ITontineRound[] }
type ITontineContent = PageableData & { content: ITontine[] }
type IMembershipRequestContent = PageableData & {
  content: IMembershipRequest[]
}
type ISubscriptionContent = PageableData & {
  content: ITontineRoundSubscription[]
}
