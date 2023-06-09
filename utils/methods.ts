import * as SecureStore from "expo-secure-store"

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
