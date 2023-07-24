/* eslint-disable no-nested-ternary */
import { FC, useContext, useEffect, useRef } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Checkbox, Switch, Text } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import {
  fetchNotificationSettingParams,
  getAllNotificationSettingsParams
} from "@services/store/slices/notificationSettings"
import NotificationSettingsSkeleton from "@components/ui/skeletonLoader/NorificationsParams"
import { TouchableOpacity } from "@gorhom/bottom-sheet"

const codes = ["G001", "G002", "G003", "G004", "G005", "G006", "G007", "G008"]

const NotificationSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { loading, data } = getAllNotificationSettingsParams()
  const { locale } = useContext(AppStateContext)

  const triggerDispatch = useRef<boolean>(true)

  useEffect(() => {
    if (triggerDispatch.current) {
      dispatch(fetchNotificationSettingParams())
      triggerDispatch.current = false
    }
  }, [dispatch])

  const displayNotificationParams = () => {
    if (loading) {
      return <NotificationSettingsSkeleton />
    }

    if (!data || (data && data.length === 0)) {
      return null
    }

    return data
      ?.filter(param => codes.includes(param.code))
      .map(params => (
        <View style={styles.section} key={params.id}>
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.title}>
              <Text variant="labelLarge">
                {locale.t(`settings.${params.code}`)}
              </Text>
            </View>
            <View style={[styles.checkBoxLabel, { marginRight: 8 }]}>
              <Text variant="labelSmall">Djangii</Text>
              <Text variant="labelSmall">Email</Text>
            </View>
          </View>
          <View style={[styles.sectionContent, { rowGap: 28 }]}>
            {params.notificationParameters.map(notifParams => (
              <View style={styles.checkboxSection} key={notifParams.id}>
                <View style={styles.checkBoxLabelContainer}>
                  <Text>{notifParams.notificationCategory.description}</Text>
                </View>
                <View style={styles.checkBoxLabel}>
                  <TouchableOpacity>
                    <Checkbox
                      status={
                        notifParams.notifyInPlatform
                          ? "checked"
                          : Platform.OS === "ios"
                          ? "indeterminate"
                          : "unchecked"
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Checkbox
                      status={
                        notifParams.notifyByEmail
                          ? "checked"
                          : Platform.OS === "ios"
                          ? "indeterminate"
                          : "unchecked"
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
    >
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text variant="labelLarge">
              {locale.t("settings.emailNotificationLanguage")}
            </Text>
            <View style={[styles.sectionContent, styles.emailSection]}>
              <View style={styles.checkBoxLabelContainer}>
                <Text>
                  {locale.t("settings.emailNotificationLanguageDescription")}
                </Text>
              </View>
              <View style={styles.languageSwitch}>
                <Text>En</Text>
                <Switch />
                <Text>Fr</Text>
              </View>
            </View>
          </View>
          {displayNotificationParams()}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    rowGap: 24
  },
  section: {
    rowGap: 12
  },
  sectionContent: {
    backgroundColor: "#fff",
    padding: 24,
    overflow: "hidden",
    borderRadius: 24
  },
  emailSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  languageSwitch: {
    flexDirection: "row",
    columnGap: 4,
    justifyContent: "space-between",
    alignItems: "center"
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    width: "60%"
  },
  checkBoxLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 12
  },
  checkboxContainer: {
    flexDirection: "row",
    columnGap: 4,
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkBoxLabelContainer: { width: "60%" },
  checkboxSection: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

export default NotificationSettings
