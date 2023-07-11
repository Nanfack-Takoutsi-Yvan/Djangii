import tontines, { fetchTontineList, getAllTontines } from "./tontine"
import tontineRound, {
  fetchTontineRoundList,
  getAllTontineRound
} from "./tontineRound"
import tontineSession, {
  fetchTontineSessionList,
  getAllTontineSessions
} from "./tontineSession"
import tontineSubscription, {
  fetchTontineSubscriptionList,
  getAllTontineSubscription
} from "./tontineSubscription"

export const tontinesActions = {
  fetchTontineList,
  fetchTontineRoundList,
  fetchTontineSessionList,
  fetchTontineSubscriptionList
}

export const tontinesSelector = {
  getAllTontines,
  getAllTontineRound,
  getAllTontineSessions,
  getAllTontineSubscription
}

export default {
  tontines,
  tontineRound,
  tontineSession,
  tontineSubscription
}
