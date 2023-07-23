/* eslint-disable no-unsafe-optional-chaining */
import { useContext } from "react"
import { Drawer } from "expo-router/drawer"
import { Platform, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import NavigationDrawer from "@components/ui/NavigationDrawer"
import AppStateContext from "@services/context/context"
import { useRouter } from "expo-router"
import { getAvatarLetters } from "@utils/functions/format"
import { useAuth } from "@services/context/auth"
import AppAvatar from "@components/ui/AppAvatar"

export default function DashboardLayout() {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()
  const { user } = useAuth()

  return (
    <Drawer
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerLabel,
        drawerIcon: ({ size }) => (
          <Icon size={size} source="menu" color={colors.primary} />
        ),
        drawerStyle: styles.drawer,
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push("appInfoModal")}>
            {user ? <AppAvatar size={24} user={user.userInfos} /> : null}
          </TouchableOpacity>
        )
      }}
      drawerContent={NavigationDrawer}
    >
      <Drawer.Screen
        name="index"
        options={{ headerTitle: locale.t("drawer.dashboard") }}
      />
    </Drawer>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 1,
    borderColor: "#fff",
    borderStyle: "solid",
    marginRight: 18
  },
  avatarLabel: { fontSize: 9, fontFamily: "SoraBold" },
  drawer: {
    backgroundColor: "rgba(42, 17, 65, 0.9)",
    borderTopRightRadius: Platform.OS === "ios" ? 0 : 30
  },
  header: {
    backgroundColor: "#532181",
    shadowColor: "transparent"
  },
  headerLabel: {
    color: "#fff",
    fontFamily: "SoraBold"
  }
})
