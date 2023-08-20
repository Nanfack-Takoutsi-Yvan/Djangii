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
        reject: "reject",
        eligibleAssociation: "eligible-associations",
        isUsernameAvailable: "username-used"
      },
      membershipRequest: {
        all: "api/membership-requests"
      },
      associationsMembers: {
        default: {
          start: "api/associations/",
          end: "/members"
        }
      },
      isUserInDjangii: "api/users/search",
      inviteMember: "api/associations/members/send-invitation",
      uploadMembersSheet: "api/associations/members/upload",
      inviteVirtualMember: "api/associations/inactive-members"
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

  public createAssociationPage = async (
    token: string,
    associationPage: INewAssociationPage
  ) => {
    assert(token, "Token is required to create association page")

    try {
      const url = `${this.resource.associationPage.base}`
      const res = await apiClient.post<IAssociationPage>(url, associationPage, {
        headers: { Authorization: token }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while creating association page: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public getEligibleAssociation = async (token: string) => {
    assert(token, "Token is required to get eligible association")

    try {
      const url = `${this.resource.associationPage.base}${this.resource.associationPage.eligibleAssociation}`
      const res = await apiClient.get<IAssociation[]>(url, {
        headers: { Authorization: token }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting eligible associations: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public isUsernameAvailable = async (token: string, username: string) => {
    assert(token, "Token is required to get association username information")

    try {
      const url = `${this.resource.associationPage.base}${this.resource.associationPage.isUsernameAvailable}`
      const res = await apiClient.get(url, {
        headers: { Authorization: token },
        params: { username }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while getting association username information: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public isUserInDjangii = async (token: string, query: string) => {
    assert(token, "Token is required to verify user information")

    try {
      const url = `${this.resource.isUserInDjangii}`
      const res = await apiClient.get<IUserInfo[]>(url, {
        headers: { Authorization: token },
        params: { query, return: "full" }
      })

      return res.data
    } catch (error) {
      const err = {
        message: `Error while verifying user information: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public inviteMember = async (token: string, payload: SingleMemberObj) => {
    assert(token, "Token is required to invite new member")

    try {
      const url = `${this.resource.inviteMember}`
      await apiClient.post(url, payload, {
        headers: { Authorization: token }
      })
    } catch (error) {
      const err = {
        message: `Error while inviting new member: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public inviteVirtualMember = async (
    token: string,
    payload: VirtualMemberConfig
  ) => {
    assert(token, "Token is required to invite new virtual member")

    try {
      const url = `${this.resource.inviteVirtualMember}`
      await apiClient.post(url, payload, {
        headers: { Authorization: token }
      })
    } catch (error) {
      const err = {
        message: `Error while inviting new virtual member: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }

  public upLoadMembersSheet = async (
    token: string,
    payload: ExcelMemberFile,
    associationId: string
  ) => {
    assert(token, "Token is required to upload new members sheet")

    try {
      const url = `${this.resource.uploadMembersSheet}`
      await apiClient.post(url, payload, {
        headers: { Authorization: token },
        params: { associationId }
      })
    } catch (error) {
      const err = {
        message: `Error while uploading new members sheet: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
