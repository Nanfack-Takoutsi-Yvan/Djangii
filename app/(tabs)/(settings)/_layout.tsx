import AppStateContext from "@services/context/context"
import { Stack } from "expo-router"
import { useContext } from "react"

export default function SettingsStack() {
  const { locale } = useContext(AppStateContext)

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: locale.t("settings.title")
        }}
      />
      <Stack.Screen name="account" />
      <Stack.Screen name="language" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="contactUs" />
      <Stack.Screen name="lexicon" />
    </Stack>
  )
}
