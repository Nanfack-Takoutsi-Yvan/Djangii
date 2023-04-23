import { StyleSheet } from "react-native"

import { Text, View } from "@components/Themed"
import EditScreenInfo from "@components/EditScreenInfo"
import { useContext } from "react"
import AppStateContext from "@services/context/context"

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: "SoraBold" }]}>
        Hi! I'm Yvan Nanfack
      </Text>
      <Text style={styles.title}>Onboarding Screen</Text>
      <Text style={styles.title}>{locale.t("message")}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
})
