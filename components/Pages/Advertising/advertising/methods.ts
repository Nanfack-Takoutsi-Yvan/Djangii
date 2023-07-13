import { advertisingSelector } from "@services/store/slices/advertising"
import { getDate } from "@services/utils/functions/format"

export const getAdvertisingData = () => advertisingSelector.getAllAdvertising()

export const advertisingApprovedDataTables = (advertisings: IAdvertising[]) =>
  advertisings
    .filter(
      advertising =>
        advertising.status === "APPROVED" || advertising.status === "BROADCAST"
    )
    .map(advertising => [
      getDate(advertising.datation.creationTime),
      getDate(advertising.dateStart),
      getDate(advertising.dateEnd),
      advertising.title,
      advertising.description,
      advertising.redirectLink,
      advertising.type,
      advertising.status
    ])

export const advertisingAwaitedDataTables = (advertisings: IAdvertising[]) =>
  advertisings
    .filter(advertising => advertising.status === "CREATED")
    .map(advertising => [
      getDate(advertising.datation.creationTime),
      getDate(advertising.dateStart),
      getDate(advertising.dateEnd),
      advertising.title,
      advertising.description,
      advertising.redirectLink,
      advertising.type,
      advertising.status
    ])

export const advertisingRejectedDataTables = (advertisings: IAdvertising[]) =>
  advertisings
    .filter(
      advertising =>
        advertising.status === "REJECTED" || advertising.status === "BLOCKED"
    )
    .map(advertising => [
      getDate(advertising.datation.creationTime),
      getDate(advertising.dateStart),
      getDate(advertising.dateEnd),
      advertising.title,
      advertising.description,
      advertising.redirectLink,
      advertising.type,
      advertising.status
    ])
