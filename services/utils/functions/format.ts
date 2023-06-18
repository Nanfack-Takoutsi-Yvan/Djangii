export const getFullName = (firstName: string, lastName: string) =>
  `${firstName || ""} ${lastName || ""}`

export const getAvatarLetters = (firstName?: string, lastName?: string) =>
  `${firstName ? firstName[0] : ""}${lastName ? lastName[0] : ""}`
