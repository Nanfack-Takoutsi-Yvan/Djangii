import { forwardRef, useCallback, useContext, useState } from "react"

import { Formik } from "formik"
import { Button, Text, TextInput } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useTheme } from "react-native-paper/src/core/theming"
import Icon from "react-native-paper/src/components/Icon"
import { Dropdown } from "react-native-element-dropdown"

import { useAppDispatch } from "@services/store"
import AppStateContext from "@services/context/context"
import {
  changeBottomSheetFormPosition,
  getBottomSheetForm
} from "@services/store/slices/bottomSheetForm"
import { snapPoints } from "@assets/constants/dashboard/bottomSheet"

import { BottomSheetProps, BottomSheetRef } from "./types"

const BottomSheetForm = forwardRef<BottomSheetRef, BottomSheetProps>(
  ({ name }, ref) => {
    const [value, setValue] = useState<string>()

    const { colors } = useTheme()
    const dispatch = useAppDispatch()
    const { locale } = useContext(AppStateContext)

    const { position, title } = getBottomSheetForm()

    const handleSheetChanges = useCallback(
      (index: number) => {
        dispatch(changeBottomSheetFormPosition(index))
      },
      [dispatch]
    )

    const data = [
      { label: "Item 1", value: "hello" },
      { label: "Item 2", value: "hello2" },
      { label: "Item 3", value: "hello3" },
      { label: "Item 4", value: "hello4" },
      { label: "Item 5", value: "hello5" },
      { label: "Item 6", value: "hello6" },
      { label: "Item 7", value: "hello7" },
      { label: "Item 8", value: "hello8" }
    ]

    return (
      <BottomSheet
        ref={ref}
        index={position}
        enablePanDownToClose
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        onChange={handleSheetChanges}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text variant="titleLarge">{locale.t(`pages.${title.label}`)}</Text>
            <Icon source={title.icon} size={32} color={colors.secondary} />
          </View>

          <Formik
            initialValues={{ otp: "", newPassword: "", passwordConfirm: "" }}
            onSubmit={() => undefined}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View style={styles.fieldsContainer}>
                <View>
                  <Dropdown
                    style={styles.dropdown}
                    selectedTextStyle={styles.soraFont}
                    inputSearchStyle={[
                      styles.inputSearchStyle,
                      styles.soraFont
                    ]}
                    itemTextStyle={styles.soraFont}
                    placeholderStyle={[styles.soraFont, styles.placeHolder]}
                    containerStyle={styles.searchContainer}
                    data={data}
                    mode="modal"
                    search
                    labelField="label"
                    valueField="value"
                    placeholder="Select item"
                    searchPlaceholder={locale.t("pages.search")}
                    value={value}
                    onChange={item => {
                      console.log(item)
                      setValue(item.value)
                    }}
                    renderLeftIcon={() => (
                      <Icon color={colors.primary} source="cash" size={40} />
                    )}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    labelStyle={styles.labelColors}
                    style={{ backgroundColor: colors.error }}
                  >
                    Annuler
                  </Button>
                  <Button mode="contained" labelStyle={styles.labelColors}>
                    Confirmer
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </BottomSheetScrollView>
      </BottomSheet>
    )
  }
)

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)"
  },
  fieldsContainer: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    rowGap: 16,
    marginTop: 12,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "baseline"
  },
  textInput: {
    paddingHorizontal: 0
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    alignItems: "baseline"
  },
  icon: {
    marginRight: 5
  },
  placeholderStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
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
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly"
  },
  labelColors: {
    color: "#fff"
  }
})

export default BottomSheetForm
