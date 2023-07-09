import { tontinesActions } from "@services/store/slices/tontines"
import { getTontineRoundData } from "./methods"
import {
  tontineClosedRoundTable,
  tontineEndedRoundTable,
  tontineOpenedRoundTable,
  createData
} from "./configs"

const tontineRoundConfigs: configs = {
  tables: [
    {
      name: "tontineEndedRound",
      table: tontineEndedRoundTable
    },
    {
      name: "tontineOpenedRound",
      table: tontineOpenedRoundTable
    },
    {
      name: "tontineClosedRound",
      table: tontineClosedRoundTable
    }
  ],
  getData: getTontineRoundData,
  fetchData: tontinesActions.fetchTontineRoundList,
  createData
}

export default tontineRoundConfigs
