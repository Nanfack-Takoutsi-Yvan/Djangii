interface IAdvertising {
  activityAreas: Description
  ageMaxAudience: number
  ageMinAudience: number
  cities: City[]
  clickCount: number
  cost: string
  costCurrency: ICurrency
  countries: ICountry[]
  coverage: number
  datation: IHistory
  dateEnd: string
  dateStart: string
  description: string
  genderAudience: AudienceGender
  hobbies: Hobby
  illustration: IDjangiiFile
  interestCenters: Description
  reasonRejection: string
  redirectLink: string
  status: AdvertisingStatus
  title: string
  type: AdvertisingType
}

type Description = {
  code: string
  datation: IHistory
  description: string
  id: string
}

type City = {
  country: ICountry
  datation: IHistory
  longitude: number
  latitude: number
  name: string
}

type AudienceGender = "MALE" | "FEMALE" | "OTHERS" | "UNSPECIFIED"

type Hobby = {
  code: string
  datation: IHistory
  description: string
  id: string
}

type AdvertisingType = "BANNER_TOP" | "BANNER_BOTTOM" | "POST"

type AdvertisingStatus =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "BROADCAST"
  | "PAUSED"
  | "FINISHED"
  | "BLOCKED"
  | "CANCELED"

interface IAdvertisingAccount {
  datation: IHistory
  id: string
  name: string
  number: number
  owner: IUserInfo
  status: AdvertisingAccountStatus
}

type AdvertisingAccountStatus = "ACTIVATED" | "DEACTIVATED" | "BLOCKED"

interface IAdvertisingAccountRequestBody {
  id: string
  name: string
}

interface IAdvertisingApproveRequestBody {
  cost: number
  costCurrencyId: string
  dateEnd: string
  dateStart: string
  id: string
}

interface IAdvertisingAudience {
  activityAreas: Description
  advertisingAccount: IAdvertisingAccount
  ageMaxAudience: number
  ageMinAudience: number
  cities: City[]
  country: ICountry[]
  datation: IHistory
  genderAudience: AudienceGender
  hobbies: Hobby[]
  interestCenters: Description
  id: string
  name: string
}

interface IAdvertisingAudienceRequestBody {
  activityAreas: Description
  advertisingAccountId: string
  ageMinAudience: string
  ageMaxAudience: string
  cities: City[]
  countries: ICountry[]
  genderAudience: AudienceGender
  hobbies: Hobby
  id: string
  interestCenters: string
  name: string
}

interface IAdvertisingRejectRequestBody {
  id: string
  reason: string
}

interface IAdvertisingRequestBody extends IAdvertisingAudience {
  illustrationFile: IDjangiiFileRequestBody
  interestCenters: Description
  redirectLink: string
  title: string
  type: AdvertisingRequestBodyType
}

type AdvertisingRequestBodyType = "BANNER_TOP" | "BANNER_BOTTOM" | "POST"

interface IAdvertisingController {
  getAdverts: (
    token: string,
    status?: AdvertisingStatus
  ) => Promise<IAdvertisingContent>
  getAudience: (token: string) => Promise<IAudienceContent>
}
