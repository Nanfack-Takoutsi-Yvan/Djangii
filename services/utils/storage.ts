import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Clipboard from "expo-clipboard"
import { Alert } from "react-native"
import { I18n } from "i18n-js"

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

export async function saveInAsyncStorage(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export async function getFromAsyncStorage(key: string): Promise<any | null> {
  try {
    const value: string | null = await AsyncStorage.getItem(key)
    if (value !== null) {
      const jsonValue: any = JSON.parse(value)

      return jsonValue
    }

    return null
  } catch (e: any) {
    // error reading value
    return null
  }
}

export async function deleteFromAsyncStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    // error reading value
  }
}

export const copyData = (value: string, locale: I18n) => {
  if (value) {
    Clipboard.setStringAsync(value)
      .then(() => Alert.alert(locale.t("pages.savedClipboard")))
      .catch(() => Alert.alert(locale.t("pages.clipboardFailed")))
  } else {
    Alert.alert(locale.t("pages.clipboardFailed"))
  }
}
