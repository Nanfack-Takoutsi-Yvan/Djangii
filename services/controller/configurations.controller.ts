import apiClient from "@services/api/api.client"
import assert from "assert"

export default class ConfigurationController
  implements IConfigurationController
{
  private resources

  constructor() {
    this.resources = {
      penalty: "api/association-penalties",
      product: "api/products",
      assistance: "api/assistance-lines",
      Guarantee: "guarantee-types",
      charges: {
        line: "api/charge-lines",
        types: "api/associations/members/me"
      }
    }
  }

  public async getPenaltyTypesList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch penalty types list")
      const res = await apiClient.get<IPenaltyTypeListContent>(
        this.resources.penalty,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of penalty types request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getProductTypesList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch product types list")
      const res = await apiClient.get<IProductTypesListContent>(
        this.resources.product,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of products types request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getChargeLineList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch charge line list")
      const res = await apiClient.get<IChargeLineContent>(
        this.resources.charges.line,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of charge line request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getChargeTypesList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch charge types list")
      const res = await apiClient.get<IChargeTypesContent>(
        this.resources.charges.types,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of charge types request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getGuaranteeTypeList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch Guarantee types list")
      const res = await apiClient.get<IGuaranteeTypesContent>(
        this.resources.Guarantee,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of Guarantee types request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public async getAssistanceTypeList(token: string, associationId: string) {
    try {
      assert(token, "token is required to fetch assistance types list")
      const res = await apiClient.get<IAssistanceTypesContent>(
        this.resources.assistance,
        {
          headers: { Authorization: token },
          params: { associationId }
        }
      )

      return res.data
    } catch (error) {
      const err = {
        message: `An error occurred while getting the list of assistance types request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
