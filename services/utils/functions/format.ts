export const getFullName = (firstName: string, lastName: string) =>
  `${firstName || ""} ${lastName || ""}`

export const getAvatarLetters = (firstName?: string, lastName?: string) =>
  `${firstName ? firstName[0] : ""}${
    lastName ? lastName[0] : ""
  }`.toLocaleUpperCase()

export const getDate = (date: string) =>
  date ? new Date(date).toDateString() : new Date().toDateString()

export const userFullName = (firstName?: string, lastName?: string) =>
  `${firstName ?? ""} ${lastName ?? ""}, Djangii App`

export const capitalize = (value?: string) => {
  if (!value) return ""

  const tempValue = value.trim().split(" ")
  tempValue.forEach(text => {
    const tempText = text.split("")
    tempText[0].toLocaleUpperCase()
    tempText.join("")
  })
  return tempValue.join(" ")
}
