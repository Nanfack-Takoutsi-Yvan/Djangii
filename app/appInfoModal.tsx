import InfoModal from "@components/ui/InfoModal"
import { useAuth } from "@services/context/auth"
import { useAppDispatch } from "@services/store"
import { logout } from "@services/store/slices/auth"
import { useRouter } from "expo-router/src/exports"

const AppInfoModal = () => {
  const router = useRouter()
  const { signOut } = useAuth()
  const dispatch = useAppDispatch()

  return (
    <InfoModal
      onLogout={() => {
        router.back()
        setTimeout(() => signOut(), 200)
        dispatch(logout())
      }}
    />
  )
}

export default AppInfoModal
