import { FC, useCallback, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme, IconButton } from "react-native-paper"
import AppStateContext from "@services/context/context"
import { copyData } from "@services/utils/storage"
import { useAppDispatch } from "@services/store"
import { updateBottomSheetFormState } from "@services/store/slices/bottomSheetForm"

const TableActionButton: FC<TableActionButton> = ({
  setDataId,
  data,
  rowId,
  actions
}) => {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  const discardData = useCallback(
    async (
      value: string,
      method?: (values: string[], value: string) => void
    ) => {
      try {
        setLoading(true)
        if (method) method([], value)
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
    },
    [locale, setActionModalProps, setLoading]
  )

  const actionType = useCallback(
    (
      method?: (data?: any, id?: string) => any
    ): Record<
      Actions,
      {
        icon: string
        style: Record<string, string>
        onPress: () => void
      }
    > => ({
      delete: {
        icon: "delete-empty-outline",
        style: { backgroundColor: colors.primary },
        onPress: () => {
          if (method) method(data, rowId)
        }
      },
      edit: {
        icon: "file-edit-outline",
        style: { backgroundColor: colors.backdrop },
        onPress: () => {
          if (method) method(data, rowId)
          dispatch(
            updateBottomSheetFormState({
              titleItems: {
                label: "form Title",
                icon: "user"
              },
              buttonTitle: "",
              position: 0,
              currentData: data.find(obj => obj.id === rowId)
            })
          )
        }
      },
      view: {
        icon: "eye-outline",
        style: { backgroundColor: colors.secondary },
        onPress: () => {
          if (method) method(data, rowId)
        }
      },
      copy: {
        icon: "content-copy",
        style: { backgroundColor: colors.error },
        onPress: () => {
          if (method) {
            const value = method(data, rowId)
            copyData(value, locale)
          }
        }
      },
      validate: {
        icon: "check",
        style: { backgroundColor: colors.secondary },
        onPress: () => {
          if (method) method(data, rowId)
          setDataId(rowId)
        }
      },
      discard: {
        icon: "close",
        style: { backgroundColor: colors.error },
        onPress: () => discardData(rowId, method)
      }
    }),
    [colors, data, discardData, dispatch, locale, rowId, setDataId]
  )

  return (
    <View style={styles.container}>
      {actions.map(action => {
        if (!action.name) return null
        const actionProps = actionType(action.method)[action.name]
        return (
          <IconButton
            size={16}
            iconColor="white"
            key={action.name}
            icon={actionProps.icon}
            style={actionProps.style}
            onPress={actionProps.onPress}
          />
        )
      })}
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
