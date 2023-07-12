import assistance, { fetchAssistance, getAllAssistance } from "./assistance"
import chargeLine, { fetchChargeLines, getAllChargeLines } from "./chargeLine"
import chargeTypes, { fetchChargeTypes, getAllChargeTypes } from "./chargeTypes"
import guarantee, { fetchGuarantees, getAllGuarantees } from "./guarantee"
import penaltyTypes, {
  fetchPenaltiesTypes,
  getAllPenaltiesTypes
} from "./penaltyTypes"
import productTypes, {
  fetchProductsTypes,
  getAllProductsTypes
} from "./productTypes"

export const membersActions = {
  fetchAssistance,
  fetchChargeLines,
  fetchChargeTypes,
  fetchGuarantees,
  fetchPenaltiesTypes,
  fetchProductsTypes
}

export const membersSelector = {
  getAllPenaltiesTypes,
  getAllProductsTypes,
  getAllGuarantees,
  getAllChargeTypes,
  getAllChargeLines,
  getAllAssistance
}

export default {
  productTypes,
  penaltyTypes,
  guarantee,
  chargeTypes,
  chargeLine,
  assistance
}
