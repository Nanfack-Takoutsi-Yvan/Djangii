/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import assert from "assert"
import apiClient from "@services/api/api.client"

export class AssociationController implements IAssociationController {
  private resource

  constructor() {
    this.resource = {
      me: "api/associations/me"
    }
  }

  public getAssociations = async (token: string, expect?: string) => {
    assert(token, "token is required")

    try {
      const res = await apiClient.get<IAssociationData>(this.resource.me, {
        headers: { Authorization: token },
        params: {
          return: expect
        }
      })

      if (!res) {
        throw new Error(`No association found using the token`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting associations: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
