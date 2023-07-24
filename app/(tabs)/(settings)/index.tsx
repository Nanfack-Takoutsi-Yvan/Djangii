/* eslint-disable react/no-array-index-key */
import { useContext } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import AppStateContext from "@services/context/context"
import SettingItem from "@components/ui/SettingItem"
import settingsConfigs from "@assets/constants/settings/settings"
import { useRouter } from "expo-router"

export default function SettingsScreen() {
  const router = useRouter()
  const { locale } = useContext(AppStateContext)

  const gotTo = (path: string) => router.push(path)

  return (
    <View style={[styles.screen, styles.mainContainer]}>
      <ScrollView>
        <View style={styles.container}>
          {settingsConfigs.map(config => (
            <View key={config.name} style={styles.section}>
              <Text style={styles.title}>
                {locale.t(`settings.${config.name}`)}
              </Text>
              <View style={styles.itemsContainer}>
                {config.items.map((item, index) => (
                  <SettingItem
                    key={`${item.name}-${index}`}
                    icon={item.icon}
                    title={locale.t(`settings.${item.name}`)}
                    description={locale.t(`settings.${item.description}`)}
                    onPress={() => gotTo(item.route)}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mainContainer: {
    paddingTop: 24,
    rowGap: 12
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    rowGap: 24,
    paddingHorizontal: 24,
    paddingBottom: 12
  },
  section: {
    rowGap: 12
  },
  itemsContainer: {
    rowGap: 12
  }
})
