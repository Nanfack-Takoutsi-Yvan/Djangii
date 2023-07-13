import { advertisingSelector } from "@services/store/slices/advertising"
import { getDate } from "@services/utils/functions/format"

export const getAudienceData = () => advertisingSelector.getAllAudience()

export const audienceDataTables = (audiences: IAdvertisingAudience[]) =>
  audiences.map(audience => [
    getDate(audience.datation.creationTime),
    audience.name,
    audience.ageMinAudience,
    audience.ageMaxAudience,
    audience.genderAudience,
    audience.country.map(country => country.name).join(", "),
    audience.activityAreas.description,
    audience.hobbies.map(hobby => hobby.description).join(", "),
    audience.interestCenters
  ])
