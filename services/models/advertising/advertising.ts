import AdvertisingController from "@services/controller/advertisement.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Advertising implements IAdvertising {
  activityAreas = {} as Description

  ageMaxAudience = 0

  ageMinAudience = 0

  cities: City[] = []

  clickCount = 0

  cost = ""

  costCurrency = {} as ICurrency

  countries: ICountry[] = []

  coverage = 0

  datation = {} as IHistory

  dateEnd = ""

  dateStart = ""

  description = ""

  genderAudience = {} as AudienceGender

  hobbies = {} as Hobby

  illustration = {} as IDjangiiFile

  interestCenters = {} as Description

  reasonRejection = ""

  redirectLink = ""

  status = {} as AdvertisingStatus

  title = ""

  type = {} as AdvertisingType

  constructor(advert?: IAdvertising) {
    if (advert) Object.assign(this, advert)
  }

  static async getAdverts(status?: AdvertisingStatus) {
    const token = await getTokenFromStorage()
    const controller = new AdvertisingController()

    assert(token, "Token is required to advert list")

    const rawData = await controller.getAdverts(token, status)

    return rawData.content
  }
}
