/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import assert from "assert"
import apiClient from "@services/api/api.client"

export class AssociationController implements IAssociationController {
  private resource

  constructor() {
    this.resource = {
      association: "api/associations",
      created: "api/associations/me",
      userAssociation: "api/associations/members/me",
      associationPage: {
        base: "api/association-pages/",
        list: "list",
        info: "info",
        accept: "accept",
        reject: "reject"
      },
      membershipRequest: {
        all: "api/membership-requests"
      },
      associationsMembers: {
        default: {
          start: "api/associations/",
          end: "/members"
        }
      }
    }
  }

  public getAssociations = async (token: string, expect?: string) => {
    assert(token, "token is required")

    try {
      const res = await apiClient.get<IUserAssociation[]>(
        this.resource.userAssociation,
        {
          headers: { Authorization: token },
          params: {
            return: expect
          }
        }
      )

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

  public getCreatedAssociations = async (token: string, expect?: string) => {
    assert(token, "token is required")

    try {
      const res = await apiClient.get<IAssociationDataContent>(
        this.resource.created,
        {
          params: {
            return: expect
          },
          headers: {
            Authorization: token
          }
        }
      )

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

  public getAllAssociationPages = async (token: string) => {
    assert(token, "Token is required to fetch association page")

    try {
      const res = await apiClient.get<IAssociationPagesContent>(
        `${this.resource.associationPage.base}${this.resource.associationPage.list}`,
        { headers: { Authorization: token } }
      )

      if (!res) {
        throw new Error(`No association page found`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting page associations: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getAllMembershipRequest = async (token: string, status?: string) => {
    assert(token, "Token is required to fetch membership request")

    try {
      const res = await apiClient.get<IMembershipRequestContent>(
        this.resource.membershipRequest.all,
        {
          params: { return: "full", status },
          headers: { Authorization: token }
        }
      )

      if (!res) {
        throw new Error(`No membership request found`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting membership request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getAllAssociationMembers = async (token: string, id: string) => {
    assert(token, "Token is required to fetch association members")

    try {
      const res = await apiClient.get<IAssociationMemberContent>(
        `${this.resource.associationsMembers.default.start}${id}${this.resource.associationsMembers.default.end}`,
        { headers: { Authorization: token }, params: { return: "full" } }
      )

      if (!res) {
        throw new Error(`No association members found`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting associations members: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getMembershipRequestInfo = async (token: string, userName: string) => {
    assert(token, "Token is required to fetch association members")

    try {
      const url = `${this.resource.associationPage.base}${userName}/${this.resource.associationPage.info}`
      const res = await apiClient.get<IAssociationPageInfo>(url, {
        headers: { Authorization: token }
      })

      if (!res) {
        throw new Error(`No association members found`)
      }

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting membership request info: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public acceptMembershipRequest = async (
    token: string,
    id: string,
    role: string
  ) => {
    assert(token, "Token is required to fetch association members")

    try {
      const url = `${this.resource.associationPage.base}${id}/${this.resource.associationPage.accept}`
      const res = await apiClient.put(url, {
        headers: { Authorization: token },
        params: { role }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while accepting membership request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public rejectMembershipRequest = async (token: string, id: string) => {
    assert(token, "Token is required to fetch association members")

    try {
      const url = `${this.resource.associationPage.base}${id}/${this.resource.associationPage.reject}`
      const res = await apiClient.put(url, {
        headers: { Authorization: token }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while rejecting membership request: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public createAssociation = async (
    token: string,
    association: INewAssociation
  ) => {
    assert(token, "Token is required to create association")

    try {
      const url = `${this.resource.association}`
      const res = await apiClient.post(url, association, {
        headers: { Authorization: token }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while creating association: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
