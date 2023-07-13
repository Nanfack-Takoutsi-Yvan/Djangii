import apiClient from "@services/api/api.client"
import assert from "assert"

export default class AdvertisingController implements IAdvertisingController {
  private resources

  constructor() {
    this.resources = {
      list: "api/advertisings",
      audience: "api/advertising-audiences"
    }
  }

  public async getAdverts(token: string, status?: AdvertisingStatus) {
    try {
      assert(token, "token is required to fetch averts list")
      const res = await apiClient.get<IAdvertisingContent>(
        this.resources.list,
        {
          headers: { Authorization: token },
          params: { status }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of adverts: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getAudience(token: string) {
    try {
      assert(token, "token is required to fetch averts list")
      const res = await apiClient.get<IAudienceContent>(
        this.resources.audience,
        { headers: { Authorization: token } }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of adverts: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
