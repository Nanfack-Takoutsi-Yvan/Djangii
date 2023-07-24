interface IContactUs {
  message: string
}

interface IContactUsController {
  sendMessage: (token: string, message: string) => void
}
