interface ICurrencyController {
  getCurrenciesList(token: string): Promise<ICurrency[]>
}
