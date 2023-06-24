import { useRef } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"

import TablesTabView from "@components/ui/TablesTabView"
import TableViewerBottomSheet from "@components/ui/TableViewerBottomSheet"
import BottomSheet from "@gorhom/bottom-sheet"
import BottomSheetForm from "@components/BottomSheetForm"

export default function TabOneScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>
        <TablesTabView />
        <TableViewerBottomSheet ref={bottomSheetRef} />
        <BottomSheetForm />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#532181"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  cardContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  card: {
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10
  },
  reportSection: {
    flex: 1,
    backgroundColor: "#E8E8E8",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 12,
    paddingVertical: 12,
    overflow: "hidden"
  },
  table: {
    backgroundColor: "#fff",
    borderRadius: 30
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
  }
})
