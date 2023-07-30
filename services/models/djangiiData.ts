import DjangiiDataController from "@services/controller/djangiiData.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class DjangiiData implements IDjangiiData {
  code = ""

  datation = {} as IHistory

  description = ""

  id = ""

  constructor(data?: IDjangiiData) {
    if (data) {
      Object.assign(this, data)
    }
  }

  static getActivitiesAreas = async () => {
    const token = await getTokenFromStorage()
    const controller = new DjangiiDataController()

    assert(token, "token is required to get activities areas")

    const params = await controller.getActivityAreas(token)

    return params
  }

  static getInterestCenters = async () => {
    const token = await getTokenFromStorage()
    const controller = new DjangiiDataController()

    assert(token, "token is required to get interest center")

    const params = await controller.getInterestCenter(token)

    return params
  }

  static getHobbies = async () => {
    const token = await getTokenFromStorage()
    const controller = new DjangiiDataController()

    assert(token, "token is required to get hobbies")

    const params = await controller.getHobbies(token)

    return params
  }

  static getCountries = async () => {
    const token = await getTokenFromStorage()
    const controller = new DjangiiDataController()

    assert(token, "token is required to get countries")

    const params = await controller.getCountries(token)

    return params
  }

  static getCities = async (countryCode: string) => {
    const token = await getTokenFromStorage()
    const controller = new DjangiiDataController()

    assert(token, "token is required to get cities")

    const params = await controller.getCities(token, countryCode)

    return params
  }
}
