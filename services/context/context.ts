import AppContextProps from "@services/types/context"
import { I18n } from "i18n-js"
import { createContext } from "react"

const AppStateContext = createContext<AppContextProps>({
  setLocale: () => null,
  locale: new I18n()
})

export default AppStateContext
