interface IConfigurationController {
  getPenaltyTypesList: (
    token: string,
    associationId: string
  ) => Promise<IPenaltyTypeListContent>
  getProductTypesList: (
    token: string,
    associationId: string
  ) => Promise<IProductTypesListContent>
  getChargeLineList: (
    token: string,
    associationId: string
  ) => Promise<IChargeLineContent>
}
