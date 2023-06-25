import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme, IconButton } from "react-native-paper"

const TableActionButton: FC<TableActionButton> = ({
  onEdit,
  onDelete,
  onView
}) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      {onEdit ? (
        <IconButton
          icon="file-edit-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.primary }}
          onPress={onEdit}
        />
      ) : null}

      {onView ? (
        <IconButton
          icon="eye-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.secondary }}
          onPress={onView}
        />
      ) : null}

      {onDelete ? (
        <IconButton
          icon="delete-empty-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.error }}
          onPress={onDelete}
        />
      ) : null}
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
