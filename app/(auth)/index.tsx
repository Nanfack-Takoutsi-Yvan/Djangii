import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native"

import AppStateContext from "@services/context/context"
import { Text, View } from "@components/Themed"
import { useContext } from "react"
import Colors from "@constants/Colors"
import Button from "@components/Button"
import { SafeAreaView } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)

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
            iconSize={0.05 * width}
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
    fontSize: 0.06 * width,
    width: "89%",
    fontFamily: "SoraBold",
    color: "white"
  },
  emphasis: {
    color: Colors.light.accent
  },
  subtitle: {
    fontSize: 0.04 * width,
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
