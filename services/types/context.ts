import { I18n } from "i18n-js/typings"
import { ActionModalProps } from "@components/ActionModal"

import { IUser } from "./auth"

export default interface AppContextProps {
  user: IUser
  locale: I18n
  isAppConnected: boolean
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  setLocale: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setActionModalProps: React.Dispatch<React.SetStateAction<ActionModalProps>>
}
