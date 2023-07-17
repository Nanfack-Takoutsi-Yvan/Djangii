interface IUserAssociation {
  id: string
  alias?: string
  firstName: string
  lastName: string
  numero: number
  userInfos?: IUserInfo
  role: IUserRole
  type: string
  dateJoinAssociation: string
  association: IAssociation
  author: IUserInfo
  datation: IHistory
}

interface IAssociation {
  acronym: string
  activated: boolean
  creator: IUserInfo
  currency: ICurrency
  datation: IHistory
  id: string
  latitude: number
  longitude: number
  name: string
}
interface IAssociationNotificationRequestBody {
  associationId: string
  description: string
  sendType:
    | "SEND_TO_ALL_MEMBERS_ASSOCIATION"
    | "SEND_TO_MEMBER_ASSOCIATION"
    | "SEND_TO_ADMIN_ASSOCIATION"
  title: string
  userInfosIds: string[]
}

interface IAssociationPage {
  association: IAssociation
  author: IUserInfo
  avatar: IDjangiiFile
  coverPicture: IDjangiiFile
  datation: IHistory
  description: string
  email: string
  id: string
  isPublic: boolean
  links: IExternalLink[]
  name: string
  phone: string
  username: string
  visible: boolean
}

interface IAssociationPageBlacklist {
  associationPage: IAssociationPage
  author: IUserInfo
  datation: IHistory
  id: string
  userInfos: IUserInfo
}

interface IAssociationPageInfo {
  associationPage: IAssociationPage
  canCurrentUserSubmitMembership: boolean
  countMembershipRequest: number
  roleCurrentUser: IUserRole[]
}

interface IAssociationPageMessage {
  associationPage: IAssociationPage
  content: string
  datation: IHistory
  id: string
  sender: IUserInfo
}

interface IAssociationPageMessageRequestBody {
  associationPageId: string
  content: string
}

interface IAssociationPageRequestBody {
  associationId: string
  description: string
  isPublic: boolean
  name: string
  username: string
  visible: boolean
}

interface IAssociationPageUpdateRequestBody {
  data: string
}

interface IAssociationPenalty {
  amount: number
  association: IAssociation
  datation: IHistory
  description: string
  designation: string
  id: string
  majoration: number
  percent: boolean
}

interface IAssociationPenaltyRequestBody {
  amount: number
  association: IAssociation
  description: string
  designation: string
  majoration: number
}

interface IMembershipRequest {
  id?: string
  firstName: string
  lastName: string
  status: string
  alias: string
  requestMotivation: string
  associationPage: IAssociationPage
  transmitter: ITransmitter
  datation: IHistory
  accepted: boolean
  rejected: boolean
  pending: boolean
}

interface IAssociationController {
  getAssociations: (
    token: string,
    expect: string
  ) => Promise<IUserAssociation[]>
  getCreatedAssociations: (
    token: string,
    expect: string
  ) => Promise<IAssociationDataContent>
  getAllMembershipRequest: (
    token: string,
    status: string
  ) => Promise<IMembershipRequestContent>
  getAllAssociationMembers: (
    token: string,
    id: string
  ) => Promise<IAssociationMemberContent>
  getAllAssociationPages: (token: string) => Promise<IAssociationPagesContent>
}
