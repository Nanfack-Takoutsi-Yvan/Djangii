import { FC, useContext } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { useTheme, IconButton } from "react-native-paper"
import * as Clipboard from "expo-clipboard"
import AppStateContext from "@services/context/context"

const TableActionButton: FC<TableActionButton> = ({
  onEdit,
  onDelete,
  onView,
  onCopy,
  onDiscard,
  onValidate,
  data,
  rowId
}) => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  const copyData = (value: string) => {
    if (value) {
      Clipboard.setStringAsync(value)
        .then(() => Alert.alert(locale.t("pages.savedClipboard")))
        .catch(() => Alert.alert(locale.t("pages.clipboardFailed")))
    } else {
      Alert.alert(locale.t("pages.clipboardFailed"))
    }
  }

  return (
    <View style={styles.container}>
      {onEdit ? (
        <IconButton
          icon="file-edit-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.primary }}
          onPress={() => onEdit(data, rowId)}
        />
      ) : null}

      {onView ? (
        <IconButton
          icon="eye-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.secondary }}
          onPress={() => onView(data, rowId)}
        />
      ) : null}

      {onCopy ? (
        <IconButton
          icon="content-copy"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.backdrop }}
          onPress={() => {
            const value = onCopy(data, rowId)
            copyData(value)
          }}
        />
      ) : null}

      {onDelete ? (
        <IconButton
          icon="delete-empty-outline"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.error }}
          onPress={() => onDelete(data, rowId)}
        />
      ) : null}

      {onValidate ? (
        <IconButton
          icon="check"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.secondary }}
          onPress={() => onValidate(data, rowId)}
        />
      ) : null}

      {onDiscard ? (
        <IconButton
          icon="close"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.error }}
          onPress={() => onDiscard(data, rowId)}
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
