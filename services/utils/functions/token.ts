import { getValueFromSecureStoreFor } from "@services/utils/storage"

export default async function getTokenFromStorage() {
  const key = process.env.SECURE_STORE_TOKEN
  if (!key) return ""

  const token = await getValueFromSecureStoreFor(key)

  return token
}
