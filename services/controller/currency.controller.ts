import apiClient from "@services/api/api.client"
import assert from "assert"

export default class CurrencyController implements ICurrencyController {
  private resource

  constructor() {
    this.resource = {
      list: "api/public/currencies"
    }
  }

  public async getCurrenciesList(token: string) {
    try {
      assert(token, "token is required to get currencies list")
      const res = await apiClient.get<ICurrency[]>(this.resource.list, {
        params: {
          return: "full"
        },
        headers: {
          Authorization: token
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting currencies: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
