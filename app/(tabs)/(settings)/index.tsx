import { StyleSheet, Text, View } from "react-native"

import SettingItem from "@components/ui/SettingItem"
import { useContext } from "react"
import AppStateContext from "@services/context/context"

export default function SettingsScreen() {
  const { locale } = useContext(AppStateContext)

  return (
    <View style={[styles.screen, styles.mainContainer]}>
      <Text style={styles.title}>Section title</Text>
      <SettingItem
        icon="cog"
        title={locale.t("hello world")}
        description={locale.t("Hello world")}
        onPress={() => console.log("hello world")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mainContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    rowGap: 12
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  }
})
