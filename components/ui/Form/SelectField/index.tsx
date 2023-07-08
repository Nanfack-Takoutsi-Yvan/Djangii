import { FC, useContext, useMemo } from "react"

import { Dropdown } from "react-native-element-dropdown"
import { useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { StyleSheet } from "react-native"
import Icon from "react-native-paper/src/components/Icon"

const SelectField: FC<SelectFieldProps> = ({
  value,
  icon,
  placeholder,
  onChange,
  options
}) => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.soraFont}
      inputSearchStyle={[styles.inputSearchStyle, styles.soraFont]}
      itemTextStyle={styles.soraFont}
      placeholderStyle={[styles.soraFont, styles.placeHolder]}
      containerStyle={styles.searchContainer}
      data={options!}
      mode="modal"
      search
      labelField="label"
      valueField="value"
      placeholder={locale.t(placeholder)}
      searchPlaceholder={locale.t("pages.search")}
      value={value}
      onChange={item => {
        onChange(item.value)
      }}
      renderLeftIcon={() => (
        <Icon color={colors.primary} source={icon} size={40} />
      )}
    />
  )
}

export default SelectField

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    alignItems: "baseline"
  },
  placeholderStyle: {
    fontSize: 16
  },
  inputSearchStyle: {
    height: 40,
    borderRadius: 30
  },
  soraFont: {
    fontFamily: "Sora",
    fontSize: 16
  },
  searchContainer: {
    borderRadius: 30,
    paddingTop: 10
  },
  placeHolder: {
    marginLeft: 8
  }
})
