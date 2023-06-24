import { View } from "react-native"
import { FC, useState } from "react"
import { SceneMap, TabView } from "react-native-tab-view"

import TableView from "@components/TableView"

import TabBar from "./tabBar"

const FirstRoute = () => <TableView />

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

export default TablesTabView
