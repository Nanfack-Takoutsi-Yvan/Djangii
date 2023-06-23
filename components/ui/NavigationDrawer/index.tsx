import { Image, StyleSheet, View } from "react-native"
import { Drawer, useTheme, Divider, Text, List } from "react-native-paper"
import {
  DrawerContentComponentProps,
  DrawerContentScrollView
} from "@react-navigation/drawer"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useRouter } from "expo-router"

import navigationDrawer from "@assets/constants/router/navigationDrawer.json"
import DrawerItems from "./drawerItem"

function NavigationDrawer(props: DrawerContentComponentProps) {
  const { colors } = useTheme()
  const router = useRouter()
  const inset = useSafeAreaInsets()

  // const navigate = (key: string) => {
  //   setActive(key)

  //   if (key === "dashboard") {
  //     router.push("(tabs)/(dashboard)")
  //     return
  //   }

  //   router.push(key)
  // }

  const items = navigationDrawer as NavigationDrawerItems
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
          <List.AccordionGroup>
            <DrawerItems items={items} activeItem="tontineTurn" />
          </List.AccordionGroup>
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
