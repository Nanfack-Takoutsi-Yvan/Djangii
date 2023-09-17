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
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
          color: "white"
        },
        headerBackTitle: locale.t("settings.title"),
        headerBackTitleStyle: { fontFamily: "Sora" },
        headerLargeTitle: true
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: locale.t("settings.title")
        }}
      />
      <Stack.Screen
        name="(account)"
        options={{
          title: locale.t("settings.account")
        }}
      />
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
