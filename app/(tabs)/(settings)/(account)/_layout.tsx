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
        headerShown: false,
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
          title: locale.t("settings.account")
        }}
      />
      <Stack.Screen
        name="updateAccount"
        options={{
          title: locale.t("settings.updateAccountDetails"),
          presentation: "modal"
        }}
      />
    </Stack>
  )
}
