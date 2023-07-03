import { ActionModalProps } from "@components/ActionModal"
import { I18n } from "i18n-js"

export default interface AppContextProps {
  locale: I18n
  isAppConnected: boolean
  setLocale: React.Dispatch<React.SetStateAction<string>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setActionModalProps: React.Dispatch<React.SetStateAction<ActionModalProps>>
}
