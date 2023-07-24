import { FC, useContext } from "react"
import AppStateContext from "@services/context/context"
import { Text, useTheme } from "react-native-paper"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { ScrollView, StyleSheet, View } from "react-native"

const NotificationModal: FC = () => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const router = useRouter()
  const param = useLocalSearchParams() as { data: string }

  const notification = JSON.parse(param.data)

  if (!notification) {
    router.back()
    return null
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: locale.t("notifications.modalHeader", {
            sender: notification.sender
          }),
          headerStyle: { backgroundColor: colors.primary },
          headerTitleStyle: { color: "#fff" }
        }}
      />
      <ScrollView style={styles.screen} contentContainerStyle={styles.screen}>
        <View style={styles.container}>
          <View style={styles.section}>
            <View style={styles.text}>
              <Text variant="labelMedium">
                {locale.t("notifications.messageTitle")}:{" "}
              </Text>
              <Text variant="labelLarge">{notification.title}</Text>
            </View>

            {notification.association ? (
              <View style={styles.text}>
                <Text variant="labelMedium">
                  {locale.t("notifications.association")}:{" "}
                </Text>
                <Text>{notification.association}</Text>
              </View>
            ) : null}

            <View style={styles.text}>
              <Text variant="labelMedium">
                {locale.t("notifications.message")}:
              </Text>
              <Text>{notification.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24
  },
  text: {
    rowGap: 8
  },
  section: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    rowGap: 24
  }
})

export default NotificationModal
