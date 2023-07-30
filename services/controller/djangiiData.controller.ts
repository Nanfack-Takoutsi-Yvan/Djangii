import apiClient from "@services/api/api.client"
import assert from "assert"

export default class DjangiiDataController implements IDjangiiDataController {
  private resource

  constructor() {
    this.resource = {
      interestCenters: "api/interest-centers",
      activityAreas: "api/activity-areas",
      hobbies: "api/hobbies",
      countries: "api/countries",
      cities: "api/cities"
    }
  }

  public getInterestCenter = async (token: string) => {
    try {
      assert(token, "token is required to get Interest centers list")
      const res = await apiClient.get<IDjangiiData[]>(
        this.resource.interestCenters,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting Interest centers: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getActivityAreas = async (token: string) => {
    try {
      assert(token, "token is required to get activities areas list")
      const res = await apiClient.get<IDjangiiData[]>(
        this.resource.activityAreas,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting activities areas: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getHobbies = async (token: string) => {
    try {
      assert(token, "token is required to get activities hobbies list")
      const res = await apiClient.get<IDjangiiData[]>(this.resource.hobbies, {
        headers: {
          Authorization: token
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting hobbies: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getCountries = async (token: string) => {
    try {
      assert(token, "token is required to get activities countries list")
      const res = await apiClient.get<ICountry[]>(this.resource.countries, {
        headers: {
          Authorization: token
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting countries: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getCities = async (token: string, countryCode: string) => {
    try {
      assert(token, "token is required to get activities cities list")
      const res = await apiClient.get<ICity[]>(this.resource.cities, {
        headers: {
          Authorization: token
        },
        params: {
          countryCode
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting cities: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
