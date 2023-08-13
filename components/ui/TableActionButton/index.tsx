import { FC, useContext } from "react"
import { Alert, StyleSheet, View } from "react-native"
import { useTheme, IconButton } from "react-native-paper"
import AppStateContext from "@services/context/context"
import { copyData } from "@services/utils/storage"

const TableActionButton: FC<TableActionButton> = ({
  onEdit,
  onDelete,
  onView,
  onCopy,
  onDiscard,
  onValidate,
  setDataId,
  data,
  rowId
}) => {
  const { colors } = useTheme()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const discardData = async (value: string) => {
    try {
      setLoading(true)
      if (onDiscard) {
        await onDiscard([], value)
      }
      setLoading(false)
      setActionModalProps({
        icon: true,
        state: "success",
        shouldDisplay: true,
        title: locale.t("tables.membershipDeniedWithSuccess")
      })
    } catch (e) {
      setLoading(false)
      setActionModalProps({
        icon: true,
        state: "error",
        shouldDisplay: true,
        title: locale.t("commonErrors.title")
      })
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
            copyData(value, locale)
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
          onPress={() => {
            onValidate(data, rowId)
            setDataId(rowId)
          }}
        />
      ) : null}

      {onDiscard ? (
        <IconButton
          icon="close"
          size={16}
          iconColor="white"
          style={{ backgroundColor: colors.error }}
          onPress={() => discardData(rowId)}
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
