import { membersActions } from "@services/store/slices/members"
import { getAssociationsMemberPages } from "./methods"
import { associationMemberPageTable, createData } from "./configs"

const associationMembersConfigs: configs = {
  tables: [
    {
      name: "members",
      table: associationMemberPageTable,
      actions: [
        {
          name: "edit",
          pageLabels: {
            formIcon: "helloworld",
            formTitle: "hello world",
            buttonTitle: "hello world"
          }
        },
        {
          name: "view"
        }
      ]
    }
  ],
  getData: getAssociationsMemberPages,
  fetchData: membersActions.fetchAssociationMembers,
  createData
}

export default associationMembersConfigs
