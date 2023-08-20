interface IProduct {
  activated: boolean
  amount: number
  association: IAssociation
  datation: IHistory
  designation: string
  id: string
  periodicity: ITontinePeriodicity
  required: boolean
}

type IProductPayload = Omit<IProduct, "id" | "activated" | "datation">
