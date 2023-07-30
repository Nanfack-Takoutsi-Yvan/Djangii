import cities, { fetchCities, getCitiesState } from "./cities"
import djangiiData, {
  fetchAllDjangiiData,
  getDjangiiDataState
} from "./rawData"

export const djangiiDataActions = {
  fetchAllDjangiiData,
  fetchCities
}

export const djangiiDataSelector = {
  getCitiesState,
  getDjangiiDataState
}

export default {
  cities,
  djangiiData
}
