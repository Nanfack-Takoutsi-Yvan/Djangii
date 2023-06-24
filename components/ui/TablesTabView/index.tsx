import { StyleSheet, View } from "react-native"
import { FC, useContext, useState } from "react"
import { Button, useTheme } from "react-native-paper"
import AppStateContext from "@services/context/context"
import { SceneMap, TabView } from "react-native-tab-view"
import Icon from "react-native-paper/src/components/Icon"

import TableView from "@components/ui/TableView"
import TabBar from "./tabBar"

const FirstRoute = () => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  return (
    <>
      <TableView />
      <View style={{ paddingHorizontal: 24, rowGap: 12 }}>
        <Button
          textColor="white"
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={() => (
            <Icon
              source="plus-box-outline"
              color={colors.secondary}
              size={24}
            />
          )}
        >
          Créer une association
        </Button>
        <Button
          textColor="white"
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon={() => (
            <Icon
              source="file-download-outline"
              color={colors.secondary}
              size={24}
            />
          )}
        >
          {locale.t("association.button")}
        </Button>
      </View>
    </>
  )
}

const SecondRoute = () => <View style={{ flex: 1 }} />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
})

const TablesTabView: FC = () => {
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" }
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{
        backgroundColor: "#E8E8E8",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
      }}
      renderTabBar={props => <TabBar {...props} />}
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  button: {
    borderRadius: 10
  },
  buttonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between"
  },
  buttonLabel: {
    color: "white"
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 30
  },
  head: {
    height: 56
  },
  wrapper: {
    flexDirection: "row"
  },
  title: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    overflow: "hidden"
  },
  row: {
    height: 56,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    fontFamily: "Sora"
  },
  headerText: {
    textAlign: "center",
    fontFamily: "SoraMedium",
    color: "#777",
    fontSize: 16
  },
  btn: {
    width: 58,
    height: 18,
    backgroundColor: "#78B7BB",
    borderRadius: 2
  },
  btnText: { textAlign: "center", color: "#fff" }
})

export default TablesTabView
