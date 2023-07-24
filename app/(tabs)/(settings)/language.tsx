import AppStateContext from "@services/context/context"
import { FC, useContext } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Text, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

const LanguageSettings: FC = () => {
  const { locale, setLocale } = useContext(AppStateContext)
  const { colors } = useTheme()

  const locales = Object.keys(locale.translations)
  const isActiveLanguage = (code: string) => code === locale.locale
  const updateLanguage = (code: string) => {
    if (isActiveLanguage(code)) return

    setLocale(code)
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text variant="labelLarge">{locale.t("settings.changeLanguage")}</Text>
        <View style={styles.languageContainer}>
          {locales.map(code => (
            <TouchableOpacity
              key={code}
              style={[styles.item, isActiveLanguage(code) ? styles.active : {}]}
              onPress={() => updateLanguage(code)}
            >
              <Text>{locale.t(`languages.${code}`)}</Text>
              {isActiveLanguage(code) ? (
                <Icon source="check-bold" size={24} color={colors.secondary} />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    padding: 24,
    rowGap: 12
  },
  languageContainer: {
    backgroundColor: "#ddd",
    borderRadius: 24,
    overflow: "hidden"
  },
  item: {
    backgroundColor: "#eee",
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  active: {
    backgroundColor: "#fff"
  }
})

export default LanguageSettings
