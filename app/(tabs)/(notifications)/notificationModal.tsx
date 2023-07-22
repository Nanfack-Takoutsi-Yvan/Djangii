import { FC, useContext } from "react"
import AppStateContext from "@services/context/context"
import { Text } from "react-native-paper"
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { ScrollView, StyleSheet, View } from "react-native"

const NotificationModal: FC = () => {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()
  const param = useLocalSearchParams() as NotificationParams

  if (!param) {
    router.back()
    return null
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: locale.t("notifications.modalHeader", { sender: param.sender })
        }}
      />
      <ScrollView style={styles.screen} contentContainerStyle={styles.screen}>
        <View style={styles.container}>
          <View>
            <Text variant="labelLarge">
              <Text variant="labelLarge">
                {locale.t("notifications.messageTitle")}:{" "}
              </Text>
              <Text variant="labelLarge">{param.title}</Text>
            </Text>
          </View>
          {param.association ? (
            <View>
              <Text>
                <Text>{locale.t("notifications.association")}: </Text>
                <Text>{param.association}</Text>
              </Text>
            </View>
          ) : null}
          <View>
            <Text>
              <Text variant="labelLarge">
                {locale.t("notifications.message")}:
              </Text>
              <Text>{param.description}</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    padding: 24,
    rowGap: 12
  }
})

export default NotificationModal
