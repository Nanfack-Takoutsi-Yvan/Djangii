import AdvertisingController from "@services/controller/advertisement.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Audience implements IAdvertisingAudience {
  activityAreas = {} as Description

  advertisingAccount = {} as IAdvertisingAccount

  ageMaxAudience = 0

  ageMinAudience = 0

  cities: City[] = []

  country: ICountry[] = []

  datation = {} as IHistory

  genderAudience = {} as AudienceGender

  hobbies: Hobby[] = []

  interestCenters = {} as Description

  id = ""

  name = ""

  constructor(audience?: IAdvertisingAudience) {
    if (audience) Object.assign(this, audience)
  }

  static async getAudience() {
    const token = await getTokenFromStorage()
    const controller = new AdvertisingController()

    assert(token, "Token is required to audience list")

    const rawData = await controller.getAudience(token)

    return rawData.content
  }
}
