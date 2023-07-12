import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getChargeLinesData = () =>
  configurationsSelector.getAllChargeLines()

export const chargeLinesDataTables = (chargeLines: ChargeLine[]) =>
  chargeLines.map(chargeLine => [
    getDate(chargeLine.datation.creationTime),
    chargeLine.designation
  ])
