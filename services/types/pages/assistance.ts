interface IAssistanceLine {
  amount: number
  association: IAssociation
  contition: string
  datation: IHistory
  designation: string
  id: string
  memo: string
  periodicity: ITontinePeriodicity
}

interface IAssistanceRequest {
  amount: number
  association: IAssociation
  comments: string
  datation: IHistory
  date: string
  id: string
  status: AssistanceRequestBodyStatus
  userInfos: IUserInfo
  assistanceLines: IAssistanceLine[]
}

type AssistanceRequestBodyStatus = "SAVED" | "REJECTED" | "APPROUVED" | "PAID"

interface IAssistanceLineRequestBody {
  amount: number
  association: IAssociation
  contition: string
  designation: string
  memo: string
  periodicity: ITontinePeriodicity
}

interface IAssistanceRequestBody {
  amount: number
  assistanceLines: IAssistanceLine[]
  comments: string
  date: string
  userInfosId: string
  status: AssistanceRequestBodyStatus
}
