import { StyleSheet } from "react-native"
import { FC, useContext, useState } from "react"
import { SceneMap, TabView } from "react-native-tab-view"

import usePages from "@services/hooks/pages/usePages"
import AppStateContext from "@services/context/context"

import TabBar from "./tabBar"

const TablesTabView: FC<TablesTabViewProps> = ({ data, tables }) => {
  const [index, setIndex] = useState(0)

  const { locale } = useContext(AppStateContext)
  const { routes, tabs } = usePages(tables, data, locale)

  const renderScene = SceneMap(tabs)

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={styles.container}
      renderTabBar={props => <TabBar {...props} />}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8E8E8",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30
  }
})

export default TablesTabView
