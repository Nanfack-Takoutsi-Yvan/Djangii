import assert from "assert"

import apiClient from "@services/api/api.client"

export default class ContactUsController implements IContactUsController {
  private resource

  constructor() {
    this.resource = {
      sendMessage: "api/contact-us"
    }
  }

  public async sendMessage(token: string, message: string) {
    try {
      assert(token, "token is send to message")
      await apiClient.post(this.resource.sendMessage, null, {
        headers: {
          Authorization: token
        },
        params: {
          message
        }
      })
    } catch (error) {
      const err = {
        message: `An error occurred while sending message: ${error}`,
        error
      }

      throw new Error(JSON.stringify(err))
    }
  }
}
