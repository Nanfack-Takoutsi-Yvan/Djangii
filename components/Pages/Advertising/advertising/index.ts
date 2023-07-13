import { advertisingActions } from "@services/store/slices/advertising"
import { getAdvertisingData } from "./methods"
import {
  createData,
  advertisingApprovedPageTable,
  advertisingAwaitedPageTable,
  advertisingRejectedPageTable
} from "./configs"

const advertisingConfigs: configs = {
  tables: [
    {
      name: "advertisingApproved",
      table: advertisingApprovedPageTable
    },
    {
      name: "advertisingAwaited",
      table: advertisingAwaitedPageTable
    },
    {
      name: "advertisingRejected",
      table: advertisingRejectedPageTable
    }
  ],
  getData: getAdvertisingData,
  fetchData: advertisingActions.fetchAdvertising,
  createData
}

export default advertisingConfigs
