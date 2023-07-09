import { membersActions } from "@services/store/slices/members"
import { getAssociationsMemberPages } from "./methods"
import { associationMemberPageTable, createData } from "./configs"

const associationMembersConfigs: configs = {
  tables: [
    {
      name: "members",
      table: associationMemberPageTable
    }
  ],
  getData: getAssociationsMemberPages,
  fetchData: membersActions.fetchAssociationMembers,
  createData
}

export default associationMembersConfigs
