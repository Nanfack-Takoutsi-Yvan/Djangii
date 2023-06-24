import { useCallback, useMemo, forwardRef } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"

import BottomSheet from "@gorhom/bottom-sheet"
import { BottomSheetProps, BottomSheetRef } from "./types"
import TableView from "../TableView"

const TableViewerBottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ name }, ref) => {
    const { colors } = useTheme()

    // variables
    const snapPoints = useMemo(() => ["50%", "100%"], [])

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index)
    }, [])

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
      >
        <View style={styles.contentContainer}>
          <TableView />
        </View>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "grey",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  }
})

export default TableViewerBottomSheet
