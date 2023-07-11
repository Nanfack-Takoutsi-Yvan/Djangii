import { tontinesActions } from "@services/store/slices/tontines"
import { getSessionsContributionsData } from "./methods"
import {
  sessionsClosedContributionTable,
  sessionsOpenedContributionTable,
  sessionsProgrammedContributionTable
} from "./configs"

const sessionsTontineConfigs: configs = {
  tables: [
    {
      name: "sessionsOpened",
      table: sessionsOpenedContributionTable
    },
    {
      name: "sessionsScheduled",
      table: sessionsProgrammedContributionTable
    },
    {
      name: "SessionsClosed",
      table: sessionsClosedContributionTable
    }
  ],
  getData: getSessionsContributionsData,
  fetchData: tontinesActions.fetchTontineSessionList
}

export default sessionsTontineConfigs
