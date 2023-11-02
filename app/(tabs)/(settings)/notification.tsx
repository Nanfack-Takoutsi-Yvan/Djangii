/* eslint-disable no-nested-ternary */
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Checkbox, Switch, Text } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import {
  fetchNotificationSettingParams,
  getAllNotificationSettingsParams,
  updateNotificationSettingParams,
  updateNotificationSettingParamsLocaly
} from "@services/store/slices/notificationSettings"
import NotificationSettingsSkeleton from "@components/ui/skeletonLoader/NorificationsParams"
import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { useAuth } from "@services/context/auth"
import Notification from "@services/models/notification"

const codes = ["G001", "G002", "G003", "G004", "G005", "G006", "G007", "G008"]

const NotificationSettings: FC = () => {
  const [switchOnOff, setSwitchOnOff] = useState<boolean>(false)

  const { user, setAuth } = useAuth()
  const dispatch = useAppDispatch()
  const { locale } = useContext(AppStateContext)
  const { loading, data } = getAllNotificationSettingsParams()

  const triggerDispatch = useRef<boolean>(true)

  const updateEmailNotificationLanguage = useCallback(async () => {
    let userInfo = user?.userInfos

    if (user?.userInfos.lang === "en") {
      userInfo = await Notification.updateNotificationLanguage("fr")
    } else {
      userInfo = await Notification.updateNotificationLanguage("en")
    }

    if (userInfo) {
      setAuth(oldUser => {
        if (oldUser) {
          return {
            ...oldUser,
            userInfos: {
              ...oldUser.userInfos,
              lang: userInfo?.lang
            }
          } as IUser
        }

        return null
      })
    }
  }, [setAuth, user?.userInfos])

  const updateGroupNotificationParams = useCallback(
    async (
      param: INotificationParameter,
      update: "notifyByEmail" | "notifyInPlatform"
    ) => {
      dispatch(
        updateNotificationSettingParamsLocaly({
          paramId: param.id,
          notifyByEmail:
            update === "notifyByEmail"
              ? !param.notifyByEmail
              : param.notifyByEmail,
          notifyInPlatform:
            update === "notifyInPlatform"
              ? !param.notifyInPlatform
              : param.notifyInPlatform
        })
      )
      dispatch(
        updateNotificationSettingParams({
          param,
          update
        })
      )
    },
    [dispatch]
  )

  useEffect(() => {
    if (triggerDispatch.current) {
      dispatch(fetchNotificationSettingParams())
      triggerDispatch.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (user?.userInfos.lang === "en") {
      setSwitchOnOff(false)
    } else if (user?.userInfos.lang === "fr") {
      setSwitchOnOff(true)
    }
  }, [user?.userInfos])

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
                  <Text>
                    {locale.t(
                      `settings.${notifParams.notificationCategory.code}`
                    )}
                  </Text>
                </View>
                <View style={styles.checkBoxLabel}>
                  <TouchableOpacity
                    onPress={() =>
                      updateGroupNotificationParams(
                        notifParams,
                        "notifyInPlatform"
                      )
                    }
                  >
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
                  <TouchableOpacity
                    onPress={() =>
                      updateGroupNotificationParams(
                        notifParams,
                        "notifyByEmail"
                      )
                    }
                  >
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
                <Switch
                  value={switchOnOff}
                  onChange={updateEmailNotificationLanguage}
                />
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
    width: "60%",
    flexWrap: "wrap"
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
