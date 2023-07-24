import assert from "assert"

import getTokenFromStorage from "@services/utils/functions/token"
import ContactUsController from "@services/controller/contactUs.controller"

export default class ContactUs implements IContactUs {
  message = ""

  private controller = new ContactUsController()

  constructor(message?: string) {
    if (message) {
      this.message = message
    }
  }

  public sendMessage = async (message?: string) => {
    const token = await getTokenFromStorage()

    assert(this.message, "Message is required to send a message")
    assert(token, "User needs to be authenticated to send messages")

    await this.controller.sendMessage(token, message || this.message)
  }
}
