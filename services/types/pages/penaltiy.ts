interface IPenaltyPayment {
  amount: number
  canceled: boolean
  comments: string
  datation: IHistory
  date: string
  datePaymentDelay: string
  details: PenaltyDetails
  expired: boolean
  id: string
  paid: boolean
  status: PenaltyStatus
  tontineSession: ITontineSession
  userInfos: IUserInfo
  unPaid: boolean
}

type PenaltyDetails = {
  amount: number
  association: IAssociation
  datation: IHistory
  description: string
  designation: string
  id: string
  majoration: number
  percent: boolean
}

type PenaltyStatus = "UNPAID" | "PAID"
