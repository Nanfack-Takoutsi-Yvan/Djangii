import { Tabs } from "expo-router"

import { useTheme } from "react-native-paper/src/core/theming"
import Icon from "react-native-paper/src/components/Icon"
import { useAppDispatch } from "@services/store"
import { useContext, useEffect } from "react"
import {
  fetchNotificationsStats,
  fetchAllNotifications
} from "@services/store/slices/notifications/actions"
import { getNotificationsStats } from "@services/store/slices/notifications"
import { StyleSheet, View } from "react-native"
import { Badge } from "react-native-paper"
import AppStateContext from "@services/context/context"

export default function TabLayout() {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)
  const dispatch = useAppDispatch()
  const { notificationNotDiplay: notificationNotDisplayed } =
    getNotificationsStats()

  useEffect(() => {
    dispatch(fetchNotificationsStats())
    dispatch(fetchAllNotifications())
  }, [dispatch])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontFamily: "SoraBold"
        },
        tabBarStyle: {
          shadowColor: "transparent",
          borderTopColor: "transparent"
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTitleStyle: {
          color: "white"
        }
      }}
    >
      <Tabs.Screen
        name="(dashboard)"
        options={{
          headerShown: false,
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon source="view-dashboard-outline" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: "SoraBold"
          }
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: locale.t("notifications.title"),
          tabBarIcon: ({ color }) => (
            <View>
              <Icon source="bell-outline" size={24} color={color} />
              {notificationNotDisplayed ? (
                <Badge size={16} style={styles.notificationBadge}>
                  {notificationNotDisplayed}
                </Badge>
              ) : null}
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          headerShown: false,
          title: locale.t("settings.title"),
          tabBarIcon: ({ color }) => (
            <Icon source="cog-outline" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  notificationBadge: {
    position: "absolute",
    color: "white",
    left: 16,
    top: -4
  }
})
