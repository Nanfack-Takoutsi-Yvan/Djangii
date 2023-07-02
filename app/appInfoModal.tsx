import InfoModal from "@components/ui/InfoModal"
import AppStateContext from "@services/context/context"
import User from "@services/models/user"
import { useRouter } from "expo-router/src/exports"
import { useContext } from "react"

const AppInfoModal = () => {
  const router = useRouter()
  const { setUser } = useContext(AppStateContext)

  return (
    <InfoModal
      onLogout={() => {
        router.back()
        router.push("./(auth)")
        setUser(new User())
      }}
    />
  )
}

export default AppInfoModal
