import { useContext, useState } from "react"
import { Image, StyleSheet, View, useWindowDimensions } from "react-native"
import { Drawer, useTheme, Divider, Text } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { NavigationDrawerItems } from "@services/types/miscellaneous"
import navigationDrawer from "@constants/router/navigationDrawer.json"
import AppStateContext from "@services/context/context"

function NavigationDrawer(props: DrawerContentComponentProps) {
  const [active, setActive] = useState("")

  const { colors } = useTheme()
  const inset = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const { locale } = useContext(AppStateContext)

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
              onPress={() => {
                setActive(key)
              }}
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
