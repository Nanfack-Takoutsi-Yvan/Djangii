import ConfigurationController from "@services/controller/configurations.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class ProductType implements IProduct {
  activated = false

  amount = 0

  association = {} as IAssociation

  datation = {} as IHistory

  designation = ""

  id = ""

  periodicity = {} as ITontinePeriodicity

  required = false

  constructor(product?: IProduct) {
    if (product) {
      Object.assign(this, product)
    }
  }

  static async getProducts(associationId: string) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to product list")

    const rawData = await controller.getProductTypesList(token, associationId)

    return rawData.content
  }

  static async createProductType(payload: IProductPayload) {
    const token = await getTokenFromStorage()
    const controller = new ConfigurationController()

    assert(token, "Token is required to create product ")

    const rawData = await controller.createProductTypes(token, payload)

    return rawData
  }
}
