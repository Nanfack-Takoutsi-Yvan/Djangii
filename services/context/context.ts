import { IUser } from "@services/types/auth"
import AppContextProps from "@services/types/context"
import { I18n } from "i18n-js"
import { createContext } from "react"

const AppStateContext = createContext<AppContextProps>({
  user: {} as IUser,
  locale: new I18n(),
  isAppConnected: true,
  setUser: () => null,
  setLocale: () => null,
  setLoading: () => null,
  setActionModalProps: () => null
})

export default AppStateContext
