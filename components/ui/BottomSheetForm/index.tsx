import { forwardRef, useCallback, useContext, useState } from "react"

import { Formik } from "formik"
import { Text, TextInput } from "react-native-paper"
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
      { label: "Item 1", value: "1" },
      { label: "Item 2", value: "2" },
      { label: "Item 3", value: "3" },
      { label: "Item 4", value: "4" },
      { label: "Item 5", value: "5" },
      { label: "Item 6", value: "6" },
      { label: "Item 7", value: "7" },
      { label: "Item 8", value: "8" }
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
                <View style={styles.field}>
                  <Icon
                    source="account-group-outline"
                    color={
                      errors.otp && touched.otp ? colors.error : colors.primary
                    }
                    size={32}
                  />
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder="name"
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={values.otp}
                        onBlur={handleBlur("otp")}
                        onChangeText={handleChange("otp")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="name"
                        error={!!errors.otp && touched.otp}
                      />
                    </View>
                    {errors.otp && touched.otp && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.otp)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.field}>
                  <Icon
                    source="form-textbox"
                    color={
                      errors.otp && touched.otp ? colors.error : colors.primary
                    }
                    size={32}
                  />
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder="Acronyme"
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="numeric"
                        value={values.otp}
                        onBlur={handleBlur("otp")}
                        onChangeText={handleChange("otp")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="name"
                        error={!!errors.otp && touched.otp}
                      />
                    </View>
                    {errors.otp && touched.otp && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.otp)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <Dropdown
                  style={styles.dropdown}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  searchPlaceholder="Search..."
                  value={value}
                  renderInputSearch={props => (
                    <TextInput
                      placeholder="Acronyme"
                      placeholderTextColor="rgba(0, 0, 0, 0.20)"
                      keyboardType="numeric"
                      value={values.otp}
                      onBlur={handleBlur("otp")}
                      onChangeText={handleChange("otp")}
                      style={styles.textInput}
                      dense
                      underlineColor="rgba(0,0,0,0.5)"
                      autoComplete="name"
                      error={!!errors.otp && touched.otp}
                    />
                  )}
                  onChange={item => {
                    setValue(item.value)
                  }}
                  renderLeftIcon={() => (
                    <Icon color={colors.primary} source="cash" size={40} />
                  )}
                />
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
    rowGap: 16,
    marginTop: 12
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
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5
  },
  icon: {
    marginRight: 5
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  }
})

export default BottomSheetForm
