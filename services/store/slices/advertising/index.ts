import audience, { fetchAudience, getAllAudience } from "./audience"
import advertising, { fetchAdvertising, getAllAdvertising } from "./advertising"

export const advertisingActions = {
  fetchAdvertising,
  fetchAudience
}

export const advertisingSelector = {
  getAllAdvertising,
  getAllAudience
}

export default {
  advertising,
  audience
}
