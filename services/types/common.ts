interface IHistory {
  creationTime: string
  lastUpdateTime: string
  version: number
}

interface ICurrency {
  code: string
  countryCode: string
  datation: IHistory
  designation: string
  id: string
}

interface IExternalLink {
  id: string
  type: string
  url: string
}

interface IDjangiiFile {
  datation: IHistory
  encodedFile: string
  encodedFileExtension: string
  id: string
  url: string
}

interface IDjangiiFileRequestBody {
  encodedFile: string
  encodedFileExtension: string
}

type Role = {
  role: IUserRole
  label: string
}

type IUserRole =
  | "ADMINISTRATOR"
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "AUDITOR"
  | "TREASURER"
  | "CLERK"
  | "CONTRIBUTOR"
  | "GENERAL_SECRETARY"
  | "CENSOR"
  | "UNDEFINED"
  | "MEMBER"

type Pageable = {
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  pageSize: number
  pageNumber: number
  offset: number
  paged: boolean
  unpaged: boolean
}

type Sort = {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

interface ICountry {
  code: string
  name: string
  datation: IHistory
  id: string
}

interface ICity {
  country: ICountry
  datation: IHistory
  id: string
  latitude: number
  longitude: number
  name: string
}

type Avatar = {
  datation: IHistory
  id: string
  url: string
}

type NotificationParams = {
  sender: string
  association?: string | null
  description: string
  title: string
}
