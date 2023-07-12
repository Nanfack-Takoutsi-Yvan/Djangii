import apiClient from "@services/api/api.client"
import assert from "assert"

export default class PaymentController implements IPaymentController {
  private resource

  constructor() {
    this.resource = {
      penalties: {
        list: "api/member-penalties"
      },
      product: {
        list: "api/product-payments"
      },
      charge: {
        list: "api/charge-payments"
      },
      assistanceRequest: "api/assistance-requests"
    }
  }

  public async getPenaltiesList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch penalties payment list")
      const res = await apiClient.get<IPenaltyListContent>(
        this.resource.penalties.list,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of penalties payment: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getProductPaymentList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch product payment list")
      const res = await apiClient.get<IProductPaymentListContent>(
        this.resource.product.list,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of product payment: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getChargePaymentList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch charge payment list")
      const res = await apiClient.get<IChargePaymentContent>(
        this.resource.charge.list,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of charge payment: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getAssistanceRequestList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch assistance request list")
      const res = await apiClient.get<IAssistanceRequestContent>(
        this.resource.assistanceRequest,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of assistance request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
