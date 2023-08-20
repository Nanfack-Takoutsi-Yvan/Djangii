interface ICharge {
  amount: number
  chargeLines: ChargeLine[]
  datation: IHistory
  description: string
  designation: string
  id: string
}

type ChargeLine = {
  association: IAssociation
  datation: IHistory
  designation: string
  id: string
}

type ChargeLinePayload = Omit<ChargeLine, "datation" | "id">

type ChargePayload = Omit<ICharge, "datation" | "id">
