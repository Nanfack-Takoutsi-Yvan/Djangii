export const getFullName = (firstName: string, lastName: string) =>
  `${firstName || ""} ${lastName || ""}`

export const getAvatarLetters = (firstName?: string, lastName?: string) =>
  `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`

export const getDate = (date: string) => new Date(date).toDateString()

export const userFullName = (firstName?: string, lastName?: string) =>
  `${firstName ?? ""} ${lastName ?? ""}, Djangii App`
