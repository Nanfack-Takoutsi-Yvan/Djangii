import apiClient from "@services/api/api.client"
import assert from "assert"

export default class TontineController implements ITontineController {
  private resource

  constructor() {
    this.resource = {
      list: "api/tontines",
      round: "api/tontine-rounds",
      sessions: "api/tontine-sessions",
      mySubscription: "api/tontine-rounds/my-subscription"
    }
  }

  public async getTontineList(
    token: string,
    associationId: string,
    type?: TONTINE_TYPE
  ) {
    try {
      assert(token, "token is required to get the list of tontines")

      const res = await apiClient.get<ITontineContent>(this.resource.list, {
        params: {
          return: "full",
          associationId,
          type
        },
        headers: {
          Authorization: token
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of tontines: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getTontineRoundList(
    token: string,
    associationId: string,
    status?: TontineRoundStatus
  ) {
    try {
      assert(token, "token is required to get the list of tontines")

      const res = await apiClient.get<ITontineRoundContent>(
        this.resource.round,
        {
          params: {
            return: "full",
            associationId,
            status
          },
          headers: {
            Authorization: token
          }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of tontines rounds: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getMySubscriptionsList(token: string) {
    try {
      assert(token, "token is required to get the list of tontines")

      const res = await apiClient.get<ISubscriptionContent>(
        this.resource.mySubscription,
        {
          headers: {
            Authorization: token
          }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of subscriptions: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getTontineSessionsList(
    token: string,
    associationId: string,
    status?: TontineSessionStatus
  ) {
    try {
      assert(token, "token is required to get the list of tontines")

      const res = await apiClient.get<ITontineSessionContent>(
        this.resource.sessions,
        {
          headers: {
            Authorization: token
          },
          params: {
            status,
            associationId,
            return: "full"
          }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of sessions: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async createNewTontine(token: string, payload: NewTontine) {
    try {
      assert(token, "token is required to creating new Tontine")

      await apiClient.post(this.resource.list, payload, {
        headers: {
          Authorization: token
        }
      })
    } catch (error) {
      const err = {
        message: `An error occurred while getting creating new tontine: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
