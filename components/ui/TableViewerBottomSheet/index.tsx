import { useCallback, useMemo, forwardRef, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

import BottomSheet from "@gorhom/bottom-sheet"
import { useAppDispatch } from "@services/store"
import {
  changeViewPosition,
  getViewState
} from "@services/store/slices/bottomSheetTables"

import { BottomSheetProps, BottomSheetRef } from "./types"

const TableViewerBottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ name }, ref) => {
    const { colors } = useTheme()
    const dispatch = useAppDispatch()
    const { position } = getViewState()

    // variables
    const snapPoints = useMemo(() => ["50%", "100%"], [])

    // callbacks
    const handleSheetChanges = useCallback(
      (index: number) => {
        dispatch(changeViewPosition(index))
      },
      [dispatch]
    )

    return (
      <BottomSheet
        ref={ref}
        index={position}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
      >
        <View style={styles.contentContainer}>
          {/* {data ? (
            <TableView
              table={{
                tableData: data.data,
                tableHead: data.headers,
                widthArr: data.cellSize
              }}
            />
          ) : null} */}
          <Text>Hello world 🎉</Text>
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
