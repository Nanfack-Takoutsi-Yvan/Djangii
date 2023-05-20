import { I18n } from "i18n-js/typings"
import { IUser } from "./auth"

export default interface AppContextProps {
  locale: I18n
  setLocale: React.Dispatch<React.SetStateAction<string>>
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}
