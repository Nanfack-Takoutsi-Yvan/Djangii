import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native"

import { useContext } from "react"
import Colors from "@constants/Colors"
import { useRouter } from "expo-router"
import Button from "@components/ui/Button"
import { Text, View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { SafeAreaView } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

export default function Onboarding() {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>
            <Text style={{ color: "white" }}>
              {locale.t("onboarding.title.fistPart")}
            </Text>
            <Text style={styles.emphasis}>
              {" "}
              {locale.t("onboarding.title.emphasis")}
            </Text>
            <Text style={{ color: "white" }}>,</Text>
          </Text>
          <Text style={styles.title}>
            {locale.t("onboarding.title.lastPart")}
          </Text>
          <Text style={[styles.subtitle]}>
            {locale.t("onboarding.subtitle")}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={locale.t("onboarding.button")}
            color="#fff"
            style={styles.button}
            iconRight="chevron-right"
            iconColor={Colors.light.accent}
            iconSize={32}
            OnPress={() => router.push("login")}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 26,
    width: "89%",
    fontFamily: "SoraBold",
    color: "white"
  },
  emphasis: {
    color: Colors.light.accent
  },
  subtitle: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: "SoraMedium",
    color: "white"
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
