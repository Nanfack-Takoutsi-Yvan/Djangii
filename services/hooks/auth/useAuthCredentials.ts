/* eslint-disable no-console */
import { IUser } from "@services/types/auth"
import { getValueFromSecureStoreFor } from "@services/utils/methods"
import { useEffect, useState } from "react"

const useAuthCredentials = () => {
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchUserData = async () => {
    setLoading(true)
    const key = process.env.SECURE_STORE_CREDENTIALS as string
    const credentials = await getValueFromSecureStoreFor(key)

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
