import AppStateContext from "@services/context/context"
import { Stack } from "expo-router"
import { useContext } from "react"
import { useTheme } from "react-native-paper"

export default function SettingsStack() {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
          color: "white"
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: locale.t("settings.title")
        }}
      />
      <Stack.Screen name="account" />
      <Stack.Screen name="language" />
      <Stack.Screen name="notification" />
      <Stack.Screen
        name="contactUs"
        options={{ title: locale.t("settings.contactUs") }}
      />
      <Stack.Screen
        name="lexicon"
        options={{ title: locale.t("settings.lexicon") }}
      />
    </Stack>
  )
}
