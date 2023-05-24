import NavigationDrawer from "@components/ui/NavigationDrawer"
import { Drawer } from "expo-router/drawer"
import { Platform } from "react-native"
import Icon from "react-native-paper/src/components/Icon"

export default function DashboardLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerIcon: ({ size, color }) => (
          <Icon size={size} source="menu" color={color} />
        ),
        drawerStyle: {
          backgroundColor: "rgba(42, 17, 65, 0.9)",
          borderTopRightRadius: Platform.OS === "ios" ? 0 : 30
        }
      }}
      drawerContent={NavigationDrawer}
    >
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "overview"
        }}
      />
    </Drawer>
  )
}
