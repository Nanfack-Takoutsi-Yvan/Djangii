import ChargeType from "@services/models/charges/chargeType"
import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getChargeTypesData = () =>
  configurationsSelector.getAllChargeTypes()

export const chargeTypesDataTables = (chargeTypes: ChargeType[]) =>
  chargeTypes.map(chargeType => [
    getDate(chargeType.datation.creationTime),
    chargeType.chargeLines?.[0].designation,
    chargeType.amount,
    chargeType.description,
    chargeType.description
  ])
