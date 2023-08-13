import CurrencyController from "@services/controller/currency.controller"
import getTokenFromStorage from "@services/utils/functions/token"
import assert from "assert"

export default class Currency implements ICurrency {
  code = ""

  countryCode = ""

  datation = {} as IHistory

  designation = ""

  id = ""

  constructor(currency?: ICurrency) {
    if (currency) {
      Object.assign(this, currency)
    }
  }

  static async getCurrencies() {
    const token = await getTokenFromStorage()
    const controller = new CurrencyController()

    assert(token, "Token is required to fetch currencies")

    const rawData = await controller.getCurrenciesList(token)

    return rawData
  }
}
