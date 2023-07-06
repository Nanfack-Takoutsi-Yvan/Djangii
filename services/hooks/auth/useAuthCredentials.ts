import { getFromAsyncStorage } from "@services/utils/storage"
import { useEffect, useState } from "react"

const useAuthCredentials = () => {
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserData = async () => {
    setLoading(true)
    const key = process.env.SECURE_STORE_CREDENTIALS as string
    const credentials = await getFromAsyncStorage(key)

    if (credentials) {
      const currentUser = JSON.parse(credentials) as IUser
      setUser(currentUser)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return { loading, user }
}

export default useAuthCredentials
