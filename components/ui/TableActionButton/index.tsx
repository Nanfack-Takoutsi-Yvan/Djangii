import { FC } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { useTheme, IconButton } from "react-native-paper"

const TableActionButton: FC = () => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <IconButton
        icon="file-edit-outline"
        size={16}
        iconColor="white"
        style={{ backgroundColor: colors.primary }}
        onPress={() => Alert.alert("Edit")}
      />
      <IconButton
        icon="eye-outline"
        size={16}
        iconColor="white"
        style={{ backgroundColor: colors.secondary }}
        onPress={() => Alert.alert("View")}
      />
      <IconButton
        icon="delete-empty-outline"
        size={16}
        iconColor="white"
        style={{ backgroundColor: colors.error }}
        onPress={() => Alert.alert("Delete")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
})

export default TableActionButton
