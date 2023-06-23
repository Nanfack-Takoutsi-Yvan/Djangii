import { useContext, useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Drawer, useTheme, Divider, Text } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRouter } from "expo-router"

import navigationDrawer from "@assets/constants/router/navigationDrawer.json"
import AppStateContext from "@services/context/context"

function NavigationDrawer(props: DrawerContentComponentProps) {
  const [active, setActive] = useState<string>("dashboard")

  const { colors } = useTheme()
  const router = useRouter()
  const inset = useSafeAreaInsets()
  const { locale } = useContext(AppStateContext)

  const navigate = (key: string) => {
    setActive(key)

    if (key === "dashboard") {
      router.push("(tabs)/(dashboard)")
      return
    }

    router.push(key)
  }

  const items = navigationDrawer as NavigationDrawerItems
  const keys = Object.keys(items)
  const imageSize = 75

  return (
    <>
      <View style={[styles.header, { marginTop: inset.top }]}>
        <Image
          source={require("../../../assets/images/adaptive-icon.png")}
          style={{ width: imageSize, height: imageSize }}
        />
        <Text variant="titleLarge" style={{ color: colors.secondary }}>
          Djangii
        </Text>
      </View>
      <Divider style={[styles.divider, { borderColor: colors.secondary }]} />
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContainer}
        {...props}
      >
        <Drawer.Section showDivider={false}>
          {keys.map(key => (
            <DrawerItem
              key={key}
              focused={key === active}
              label={locale.t(`drawer.${key}.name`)}
              inactiveTintColor="white"
              activeTintColor={colors.secondary}
              labelStyle={{ fontFamily: "SoraMedium" }}
              style={{ borderRadius: 30 }}
              onPress={() => navigate(key)}
              icon={({ color, size }) => (
                <Icon source={items[key].icon} size={size} color={color} />
              )}
            />
          ))}
        </Drawer.Section>
      </DrawerContentScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row"
  },
  divider: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  drawerContainer: { paddingTop: 8 }
})

export default NavigationDrawer
