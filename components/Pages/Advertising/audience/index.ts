import { advertisingActions } from "@services/store/slices/advertising"
import { getAudienceData } from "./methods"
import { createData, audiencePageTable } from "./configs"

const audienceConfigs: configs = {
  tables: [
    {
      name: "audience",
      table: audiencePageTable
    }
  ],
  getData: getAudienceData,
  fetchData: advertisingActions.fetchAudience,
  createData
}

export default audienceConfigs
