interface ITontine {
  amount: number
  association: IAssociation
  datation?: IHistory
  id?: string
  interestAssociationPercent: number
  interestRate: number
  interestRefundFailPercent: number
  maxAmountLoanPerMember: number
  name: string
  type: TontineType
  periodicity: ITontinePeriodicity
  refundPeriodicity: ITontinePeriodicity
}

type TontineType =
  | "CONTRIBUTION"
  | "VARIABLE_CONTRIBUTION"
  | "SAVING"
  | "DONATION"

enum TONTINE_TYPE {
  CONTRIBUTION = "CONTRIBUTION",
  VARIABLE_CONTRIBUTION = "VARIABLE_CONTRIBUTION",
  SAVING = "SAVING",
  DONATION = "DONATION"
}

interface ITontineDrawModel {
  beneficiaries: string[]
  date: string
}

interface ITontinePeriodicity {
  frequency: number
  value: string
}

interface ITontineRound {
  amountAvailableForLoan: string
  associationParticiped: string
  compteHBTontineAss: string
  compteTontineAss: string
  compteTontineMemAss: string
  datation: IHistory
  dateEnd: string
  dateStart: string
  id?: string
  interestAssociationPercent: number
  interestRate: number
  interestRefundFailPercent: number
  latePenalty: IAssociationPenalty
  maxAmountLoanPerMember: number
  noContributionPenalty: IAssociationPenalty
  refundPeriodicity: ITontinePeriodicity
  status: TontineRoundStatus
  tontine: ITontine
}

type TontineRoundStatus = "OPENED" | "CLOSED" | "TERMINATED"

interface ITontineRoundRequestBody {
  associationParticiped: boolean
  dateStart: string
  interestAssociationPercent: number
  interestRate: number
  interestRefundFailPercent: number
  latePenaltyId: string
  maxAmountLoanPerMember: number
  noContributionPenaltyId: string
  refundPeriodicity: ITontinePeriodicity
  tontineId: string
}

interface ITontineRoundSubscription {
  balance: string
  compteTontine: ICompte
  datation: IHistory
  id: string
  interestGenerated: string
  tontineRound: ITontineRound
  totalBeneficiary: number
  totalContributions: number
  userInfos: IUserInfo
}

interface ITontineSession {
  beneficiaries: ITontineSessionBeneficiary
  closureNotes: string
  datation: IHistory
  date: string
  id: string
  jackpot: number
  roundReserve: number
  status: TontineSessionStatus
  tontineRound: ITontineRound
  transac: ITransac
}

type TontineSessionStatus = "OPENED" | "CLOSED" | "PROGRAMMED" | "CREATED"

interface ITontineSessionBeneficiary {
  author: IUserInfo
  datation: IHistory
  id: string
  legitimate: boolean
  occurrenceNumber: number
  userInfos: IUserInfo
}

interface ITontineController {
  getTontineList: (
    token: string,
    associationId: string,
    type?: TONTINE_TYPE
  ) => Promise<ITontineContent>
}
