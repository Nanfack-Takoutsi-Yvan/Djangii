/* eslint-disable no-console */
import User from "@services/models/user"
import { IUser } from "@services/types/auth"
import * as SecureStore from "expo-secure-store"

export const handleLogin = async (
  {
    username,
    password
  }: {
    username: string
    password: string
  },
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true)
  try {
    const user = await User.login(username, password)
    setUser(user)
    setLoading(false)
  } catch (err) {
    console.log(err)
    setLoading(false)
  }
}

export async function saveInSecureStore(key: string, value: string) {
  const isStoreAvailable = await SecureStore.isAvailableAsync()
  if (!isStoreAvailable) return

  await SecureStore.setItemAsync(key, value)
}

export async function getValueFromSecureStoreFor(key: string) {
  const isStoreAvailable = await SecureStore.isAvailableAsync()
  if (isStoreAvailable) {
    const result = await SecureStore.getItemAsync(key)

    return result
  }

  return null
}

export async function deleteValueFromSecureStoreFor(key: string) {
  const isStoreAvailable = await SecureStore.isAvailableAsync()
  if (isStoreAvailable) {
    const result = await SecureStore.deleteItemAsync(key)

    return result
  }

  return null
}
