import { FilterKeys } from "@services/constant"
import AppStateContext from "@services/context/context"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import MultiSelect from "react-native-multiple-select"
import { IconButton, TextInput, useTheme } from "react-native-paper"

const NotificationFilter: FC<NotificationFilterProps> = ({
  filters,
  setFilters,
  setManualSearch
}) => {
  const [displayFilters, setDisplayFilters] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>("")
  const [selectedItems, setSelectedItems] = useState<string[]>([
    FilterKeys.UNREAD
  ])

  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  const openFilters = useCallback(() => {
    setDisplayFilters(value => !value)
  }, [])

  const onSelect = useCallback((items: any[]) => {
    setSelectedItems(items)
  }, [])

  useEffect(() => {
    setFilters(selectedItems)
  }, [selectedItems, setFilters])

  useEffect(() => {
    setManualSearch(searchText)
  }, [searchText, setManualSearch])

  return (
    <>
      <View style={{ flexDirection: "row", marginHorizontal: 25 }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={locale.t("notifications.search")}
            placeholderTextColor="rgba(0, 0, 0, 0.20)"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.textInput}
            right={
              <TextInput.Icon icon="magnify" iconColor="rgba(0, 0, 0, 0.20)" />
            }
          />
        </View>
        <View>
          <IconButton
            size={24}
            mode="contained"
            iconColor={displayFilters ? "#fff" : colors.primary}
            onPress={openFilters}
            style={[
              styles.iconButton,
              { borderColor: colors.primary },
              displayFilters
                ? {
                    backgroundColor: colors.primary
                  }
                : undefined
            ]}
            icon={
              displayFilters ? "filter-variant-remove" : "filter-variant-plus"
            }
          />
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 25
        }}
      >
        {displayFilters && (
          <MultiSelect
            items={filters}
            uniqueKey="key"
            displayKey="value"
            selectedItems={selectedItems}
            onSelectedItemsChange={onSelect}
            altFontFamily="SoraMedium"
            tagRemoveIconColor={colors.error}
            tagBorderColor={colors.primary}
            tagTextColor={colors.primary}
            selectedItemTextColor={colors.primary}
            selectedItemIconColor={colors.primary}
            itemTextColor="#000"
            selectedItemFontFamily="SoraMedium"
            submitButtonColor={colors.primary}
            submitButtonText={locale.t("notifications.selectFilters")}
            selectText={locale.t("notifications.selectFilters")}
            styleTextDropdown={styles.font}
            styleTextDropdownSelected={styles.font}
            fontFamily="SoraMedium"
            single={false}
            selectedText={locale.t("notifications.selectedText")}
            styleDropdownMenuSubsection={styles.menuSelection}
            styleInputGroup={styles.styleInput}
            searchInputStyle={styles.searchInput}
          />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  font: {
    fontFamily: "SoraMedium"
  },
  iconButton: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10
  },
  searchInput: {
    height: 48,
    fontFamily: "Sora"
  },
  styleInput: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  menuSelection: { borderRadius: 16 }
})

export default NotificationFilter
