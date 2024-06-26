import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View
} from "react-native"

import { useContext } from "react"
import { useRouter } from "expo-router"
import { Text, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import AppStateContext from "@services/context/context"
import { SafeAreaView } from "react-native-safe-area-context"

const { height } = Dimensions.get("window")

export default function Onboarding() {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={{ color: colors.surface }}>
            <Text variant="headlineMedium">
              {locale.t("onboarding.title.fistPart")}
            </Text>
            <Text variant="headlineMedium" style={{ color: colors.secondary }}>
              {" "}
              {locale.t("onboarding.title.emphasis")}
            </Text>
            <Text variant="headlineMedium">,</Text>
          </Text>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("onboarding.title.lastPart")}
          </Text>
          <Text
            variant="titleMedium"
            style={[styles.subtitle, { color: colors.surface }]}
          >
            {locale.t("onboarding.subtitle")}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            textColor="#fff"
            buttonColor="rgba(132, 131, 131, 0.3)"
            icon={() => (
              <Icon source="chevron-right" size={36} color="#90F800" />
            )}
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={() => router.replace("login")}
          >
            {locale.t("onboarding.button")}
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subtitle: {
    marginTop: 16
  },
  titleContainer: {
    flex: 4,
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    marginTop: 0.1 * height
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#8483839C"
  }
})
