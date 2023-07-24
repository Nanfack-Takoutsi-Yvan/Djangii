import AppStateContext from "@services/context/context"
import { Stack } from "expo-router"
import { useContext } from "react"
import { useTheme } from "react-native-paper"

export default function NotificationLayout() {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="notificationModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="newNotificationModal"
        options={{
          presentation: "modal",
          title: locale.t("settings.newNotification"),
          headerStyle: { backgroundColor: colors.primary },
          headerTitleStyle: { color: "#fff" }
        }}
      />
    </Stack>
  )
}
