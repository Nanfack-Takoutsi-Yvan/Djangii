import { membersActions } from "@services/store/slices/members"
import { getAssociationsMemberPages } from "./methods"
import { associationMemberPageTable, createData } from "./configs"

const whoIsWhoConfigs: configs = {
  tables: [
    {
      name: "whoIsWho",
      table: associationMemberPageTable
    }
  ],
  getData: getAssociationsMemberPages,
  fetchData: membersActions.fetchAssociationMembers,
  customPage: "whoIsWho",
  createData
}

export default whoIsWhoConfigs
