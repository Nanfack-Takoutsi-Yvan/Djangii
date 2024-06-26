/* eslint-disable react/no-array-index-key */
import { useContext } from "react"
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from "react-native"

import { useRouter } from "expo-router"
import { Text } from "react-native-paper"
import { nativeApplicationVersion, applicationName } from "expo-application"

import SettingItem from "@components/ui/SettingItem"
import AppStateContext from "@services/context/context"
import settingsConfigs from "@assets/constants/settings/settings"

export default function SettingsScreen() {
  const router = useRouter()
  const { locale } = useContext(AppStateContext)

  const gotTo = (path: string) => router.push(path)

  return (
    <SafeAreaView
      style={[
        styles.screen,
        Platform.OS === "android" ? styles.screenMarginTop : undefined
      ]}
    >
      <View style={[styles.screen, styles.mainContainer]}>
        <ScrollView>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {settingsConfigs.map(config => (
              <View key={config.name} style={styles.section}>
                <Text variant="labelMedium">
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
          <View style={styles.appVersion}>
            <Text variant="labelSmall">
              {locale.t("common.version", {
                number: nativeApplicationVersion,
                appName: applicationName
              })}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  },
  screenMarginTop: {
    marginTop: 24
  },
  appVersion: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24
  }
})
