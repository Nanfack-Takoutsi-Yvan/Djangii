import InfoModal from "@components/ui/InfoModal"
import { useAuth } from "@services/context/auth"
import { useRouter } from "expo-router/src/exports"

const AppInfoModal = () => {
  const router = useRouter()
  const { signOut } = useAuth()

  return (
    <InfoModal
      onLogout={() => {
        router.back()
        setTimeout(() => signOut(), 200)
      }}
    />
  )
}

export default AppInfoModal
