import User from "@services/models/user"
import AppContextProps from "@services/types/context"
import { I18n } from "i18n-js"
import { createContext } from "react"

const AppStateContext = createContext<AppContextProps>({
  user: new User(),
  locale: new I18n(),
  isAppConnected: true,
  setUser: () => null,
  setLocale: () => null,
  setLoading: () => null,
  setActionModalProps: () => null
})

export default AppStateContext
