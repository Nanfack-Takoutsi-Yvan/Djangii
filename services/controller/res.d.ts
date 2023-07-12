type IAssociationDataContent = PageableData & { content: IAssociation[] }
type IAssociationPagesContent = PageableData & { content: IAssociationPage[] }
type IAssociationMemberContent = PageableData & { content: IUserAssociation[] }
type ITontineSessionContent = PageableData & { content: ITontineSession[] }
type ITontineRoundContent = PageableData & { content: ITontineRound[] }
type ITontineContent = PageableData & { content: ITontine[] }
type ILoanResponse = PageableData & { content: ILoan[] }
type IPenaltyListContent = PageableData & { content: IPenaltyPayment[] }
type IProductPaymentListContent = PageableData & { content: IProductPayment[] }
type IChargePaymentContent = PageableData & { content: IChargePayment[] }
type IPenaltyTypeListContent = PageableData & { content: IAssociationPenalty[] }
type IChargeLineContent = PageableData & { content: ChargeLine[] }
type IChargeTypesContent = PageableData & { content: ICharge[] }
type IAssistanceTypesContent = PageableData & { content: IAssistanceLine[] }
type IGuaranteeTypesContent = PageableData & { content: IGuarantee[] }
type IProductTypesListContent = PageableData & {
  content: IProduct[]
}
type IMembershipRequestContent = PageableData & {
  content: IMembershipRequest[]
}
type ISubscriptionContent = PageableData & {
  content: ITontineRoundSubscription[]
}
type IAssistanceRequestContent = PageableData & {
  content: IAssistanceRequest[]
}
