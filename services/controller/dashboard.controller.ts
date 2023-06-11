import apiClient from "@services/api/api.client"
import assert from "assert"

export default class DashboardController implements IDashboardController {
  private resource

  constructor() {
    this.resource = {
      dashboard: "/api/dashboard"
    }
  }

  public getCurveData = async (id: string, token: string) => {
    assert(id, "Need association id to get curve data")
    assert(token, "User needs to be authenticated to access curve data")

    try {
      const res = await apiClient<IDashboardData>(this.resource.dashboard, {
        params: { associationId: id },
        headers: { Authorization: token }
      })

      if (!res) {
        throw new Error(`An error occured while getting curve data`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting association curve data: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
