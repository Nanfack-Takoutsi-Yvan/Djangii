/* eslint-disable no-nested-ternary */
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Button, Checkbox, Text, TextInput, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native"
import { Formik } from "formik"
import SelectDropdown from "react-native-select-dropdown"
import Icon from "react-native-paper/src/components/Icon"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { associationSelector } from "@services/store/slices/associations"
import PERIODICITY from "@assets/constants/dashboard/periodicity"
import FREQUENCIES from "@assets/constants/dashboard/frequencies"
import { productTypesValidation } from "@services/validations/yup/pagesActions.validation"
import ProductType from "@services/models/product/productype"
import { fetchProductsTypes } from "@services/store/slices/configurations/productTypes"

const FormDefault = {
  amount: 0,
  designation: "",
  frequency: 0,
  value: "",
  required: false
}

const ProductsType: FC<DashboardPagesCreationProps> = () => {
  const [association, setAssociation] = useState<IAssociation>()
  const [customPeriodicity, setCustomPeriodicity] = useState<boolean>()
  const [selectedFrequency, setSelectedFrequencies] = useState<
    typeof FREQUENCIES
  >([])
  const [selectedPeriodicity, setSelectedPeriodicity] = useState<
    typeof PERIODICITY
  >([])

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const associationId = getDefaultAssociationId()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()

  const addSavingTontine = useCallback(
    (values: typeof FormDefault, { resetForm }: { resetForm: () => void }) => {
      if (association) {
        setLoading(true)
        const payload: IProductPayload = {
          association,
          amount: values.amount,
          designation: values.designation,
          periodicity: {
            frequency: values.frequency,
            value: values.value
          },
          required: values.required
        }

        ProductType.createProductType(payload)
          .then(() => {
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t("pages.newProductCreated")
            })

            resetForm()
            if (association) {
              dispatch(fetchProductsTypes(association.id))
            }
          })
          .catch(() =>
            setActionModalProps({
              icon: true,
              state: "error",
              shouldDisplay: true,
              title: locale.t("commonErrors.title")
            })
          )
          .finally(() => setLoading(false))
      }
    },
    [association, dispatch, locale, setActionModalProps, setLoading]
  )

  useEffect(() => {
    if (associationId) {
      const currentAssociation = associations.find(
        asso => asso.id === associationId
      )
      setAssociation(currentAssociation)
    }
  }, [associationId, associations])

  useEffect(() => {
    setSelectedFrequencies(FREQUENCIES)
    setSelectedPeriodicity(PERIODICITY)
  }, [])

  return (
    <View style={styles.singleMemberContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newProduct`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon source="piggy-bank-outline" size={32} color={colors.primary} />
        </View>
      </View>

      <Formik
        validationSchema={productTypesValidation}
        onSubmit={addSavingTontine}
        initialValues={FormDefault}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched
        }) => (
          <View style={styles.form}>
            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.designation")}
                    label={locale.t("pages.designation")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.designation}
                    onBlur={handleBlur("designation")}
                    onChangeText={handleChange("designation")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={!!errors.designation && !!touched.designation}
                  />
                </View>
                {errors.designation && touched.designation && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.designation)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.amount")}
                    label={locale.t("pages.amount")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="numeric"
                    value={values.amount?.toString() || "0"}
                    onBlur={handleBlur("amount")}
                    onChangeText={value =>
                      setFieldValue(
                        "amount",
                        value ? parseInt(value, 10) : null,
                        true
                      )
                    }
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    error={!!errors.amount && !!touched.amount}
                  />
                </View>
                {errors.amount && touched.amount && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.amount)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View
              style={[
                styles.banner,
                { backgroundColor: `${colors.primary}11` }
              ]}
            >
              <Text variant="bodyMedium">
                {locale.t("pages.periodicityDescription")}
              </Text>
            </View>

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <SelectDropdown
                    data={selectedPeriodicity}
                    defaultButtonText={locale.t("pages.selectPeriodicity")}
                    buttonStyle={[
                      styles.uniqueDropdown,
                      {
                        borderColor: errors.value
                          ? colors.error
                          : "rgba(0,0,0,0.2)"
                      }
                    ]}
                    buttonTextStyle={[
                      styles.dropdownTextStyles,
                      styles.buttonDropDownText,
                      {
                        color: errors.value ? colors.error : undefined
                      }
                    ]}
                    rowTextStyle={styles.dropdownTextStyles}
                    dropdownStyle={styles.dropdown}
                    onSelect={periodicity => {
                      if (periodicity.custom) {
                        setCustomPeriodicity(true)
                        if (periodicity.frequency) {
                          setFieldValue("frequency", 0, true)
                          setFieldValue("value", "", true)
                        }
                      } else {
                        setCustomPeriodicity(false)
                        if (periodicity.frequency) {
                          setFieldValue(
                            "frequency",
                            parseInt(periodicity.frequency, 10),
                            true
                          )
                          setFieldValue("value", periodicity.value, true)
                        } else {
                          setFieldValue("frequency", 0, true)
                          setFieldValue("value", "", true)
                        }
                      }
                    }}
                    search
                    searchInputTxtStyle={{ fontFamily: "Sora" }}
                    renderSearchInputRightIcon={() => (
                      <Icon size={24} source="magnify" color={colors.primary} />
                    )}
                    buttonTextAfterSelection={selectedItem =>
                      locale.t(selectedItem.label)
                    }
                    rowTextForSelection={item => locale.t(item.label)}
                    dropdownIconPosition="right"
                    renderDropdownIcon={() => (
                      <Icon
                        size={24}
                        source="menu-down"
                        color={errors.value ? colors.error : colors.primary}
                      />
                    )}
                    onBlur={() => handleBlur("value")}
                  />
                </View>
                {errors.value && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.value)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {customPeriodicity ? (
              <View style={styles.frequency}>
                <View style={styles.screen}>
                  <View>
                    <TextInput
                      placeholder={locale.t("pages.frequency")}
                      label={locale.t("pages.frequency")}
                      placeholderTextColor="rgba(0, 0, 0, 0.20)"
                      keyboardType="numeric"
                      value={values.frequency?.toString() || "0"}
                      onBlur={handleBlur("frequency")}
                      onChangeText={value =>
                        setFieldValue(
                          "frequency",
                          value ? parseInt(value, 10) : null,
                          true
                        )
                      }
                      style={styles.textInput}
                      dense
                      underlineColor="rgba(0,0,0,0.5)"
                      error={!!errors.frequency && !!touched.frequency}
                    />
                  </View>
                  {errors.frequency && touched.frequency && (
                    <View>
                      <Text
                        style={{
                          color: colors.error
                        }}
                      >
                        {locale.t(errors.frequency)}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.screen}>
                  <SelectDropdown
                    data={selectedFrequency}
                    defaultButtonText={locale.t("pages.value")}
                    buttonStyle={{
                      ...styles.uniqueDropdown,
                      borderBottomColor: errors.value
                        ? colors.error
                        : "rgba(0,0,0,0.2)"
                    }}
                    buttonTextStyle={{
                      ...styles.dropdownTextStyles,
                      color: errors.value ? colors.error : undefined
                    }}
                    rowTextStyle={styles.dropdownTextStyles}
                    dropdownStyle={{ borderRadius: 12 }}
                    onSelect={item => {
                      handleChange("value")(item.value)
                    }}
                    search
                    searchInputTxtStyle={{ fontFamily: "Sora" }}
                    buttonTextAfterSelection={selectedItem =>
                      locale.t(selectedItem.label)
                    }
                    rowTextForSelection={item => locale.t(item.label)}
                    onChangeSearchInputText={text => {
                      setSelectedFrequencies(
                        FREQUENCIES.filter(frequency =>
                          locale
                            .t(frequency.label)
                            .toLocaleLowerCase()
                            .includes(text.toLocaleLowerCase())
                        )
                      )
                    }}
                  />
                  {errors.value && (
                    <View>
                      <Text
                        style={{
                          color: colors.error
                        }}
                      >
                        {locale.t(errors.value)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ) : null}

            <View style={styles.field}>
              <View style={styles.screen}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                  onPress={() =>
                    setFieldValue("required", !values.required, true)
                  }
                >
                  <View>
                    <Text variant="bodyMedium">
                      {locale.t("pages.productRequired")}
                    </Text>
                  </View>
                  <View>
                    <Checkbox
                      status={
                        values.required
                          ? "checked"
                          : Platform.OS === "ios"
                          ? "indeterminate"
                          : "unchecked"
                      }
                    />
                  </View>
                </TouchableOpacity>
                {errors.required && touched.required && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.required)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View>
              <Button
                mode="contained"
                textColor={colors.surface}
                onPress={() => {
                  handleSubmit()
                }}
              >
                {locale.t(`pages.createNewProduct`)}
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  form: {
    backgroundColor: "transparent",
    rowGap: 24,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  uniqueDropdown: {
    height: 48,
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1
  },
  dropdownTextStyles: {
    fontFamily: "Sora",
    fontSize: 16
  },
  dateTimeButton: {
    justifyContent: "space-around",
    flexDirection: "row"
  },
  banner: {
    borderRadius: 4,
    padding: 8
  },
  singleMemberContainer: {},
  fileContainer: {
    rowGap: 12
  },
  instructions: {
    borderRadius: 6,
    padding: 8,
    rowGap: 12
  },
  instructionTitle: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "baseline"
  },
  uploadContainer: {
    rowGap: 8,
    paddingBottom: 24
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkboxTitleContainer: {
    rowGap: 8,
    width: "80%"
  },
  checkboxTitle: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8
  },
  label: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center"
  },
  frequency: {
    flexDirection: "row",
    flex: 1,
    columnGap: 16,
    alignItems: "center"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    flex: 4,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  titleIcon: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  buttonDropDownText: { paddingLeft: 0, textAlign: "left", marginLeft: 0 },
  buttonContainer: { flexDirection: "row", columnGap: 8 },
  buttonContent: {
    flexDirection: "row-reverse"
  },
  dropdown: {
    borderRadius: 12
  }
})

export default ProductsType
