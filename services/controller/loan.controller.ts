import apiClient from "@services/api/api.client"
import assert from "assert"

export default class LoanController implements ILoanController {
  private resource

  constructor() {
    this.resource = {
      list: "api/loans"
    }
  }

  public async getLoanList(
    token: string,
    associationId: string,
    status?: LoanStatus
  ) {
    try {
      assert(token, "token is required to get loan list")
      const res = await apiClient.get<ILoanResponse>(this.resource.list, {
        params: {
          return: "full",
          associationId,
          status
        },
        headers: {
          Authorization: token
        }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting loans: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
