/* eslint-disable no-nested-ternary */
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import { StyleSheet, View } from "react-native"
import { Formik } from "formik"
import SelectDropdown from "react-native-select-dropdown"
import Icon from "react-native-paper/src/components/Icon"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { associationSelector } from "@services/store/slices/associations"
import { chargeTypeValidation } from "@services/validations/yup/pagesActions.validation"
import {
  fetchChargeLines,
  getAllChargeLines
} from "@services/store/slices/configurations/chargeLine"
import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"
import ChargeType from "@services/models/charges/chargeType"
import { fetchChargeTypes } from "@services/store/slices/configurations/chargeTypes"

const FormDefault = {
  amount: 0,
  chargeLines: "",
  description: "",
  designation: ""
}

const ChargeTypesForm: FC<DashboardPagesCreationProps> = () => {
  const [association, setAssociation] = useState<IAssociation>()
  const [currentChargeLine, setCurrentChargeLine] = useState<ChargeLine[]>([])
  const [selectedChargeLine, setSelectedChargeLine] = useState<ChargeLine[]>([])

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const chargesLines = getAllChargeLines()
  const associationId = getDefaultAssociationId()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()

  const addChargeType = useCallback(
    (values: typeof FormDefault, { resetForm }: { resetForm: () => void }) => {
      const chargeLines = currentChargeLine.find(
        line => line.id === values.chargeLines
      )

      if (chargeLines) {
        setLoading(true)
        const payload: ChargePayload = {
          amount: values.amount,
          designation: values.designation,
          description: values.description,
          chargeLines: [chargeLines]
        }

        ChargeType.createChargeType(payload)
          .then(() => {
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t("pages.newChargeTypeCreated")
            })

            resetForm()
            if (association) {
              dispatch(fetchChargeTypes(association.id))
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
    [
      association,
      currentChargeLine,
      dispatch,
      locale,
      setActionModalProps,
      setLoading
    ]
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
    if (!chargesLines.data && association) {
      dispatch(fetchChargeLines(association?.id))
    } else if (chargesLines.data) {
      setCurrentChargeLine(chargesLines.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargesLines.data, association])

  useEffect(() => {
    setSelectedChargeLine(currentChargeLine)
  }, [currentChargeLine])

  if (!chargesLines.data) {
    return <FormSkeletonLoader />
  }

  return (
    <View style={styles.singleMemberContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newChargeType`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon source="currency-usd" size={32} color={colors.primary} />
        </View>
      </View>

      <Formik
        validationSchema={chargeTypeValidation}
        onSubmit={addChargeType}
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
                  <SelectDropdown
                    data={selectedChargeLine}
                    defaultButtonText={locale.t("pages.selectChargeLine")}
                    buttonStyle={[
                      styles.uniqueDropdown,
                      {
                        borderColor: errors.chargeLines
                          ? colors.error
                          : "rgba(0,0,0,0.2)"
                      }
                    ]}
                    buttonTextStyle={[
                      styles.dropdownTextStyles,
                      styles.buttonDropDownText,
                      {
                        color: errors.chargeLines ? colors.error : undefined
                      }
                    ]}
                    rowTextStyle={styles.dropdownTextStyles}
                    dropdownStyle={styles.dropdown}
                    onSelect={periodicity =>
                      setFieldValue("chargeLines", periodicity.id, true)
                    }
                    search
                    onChangeSearchInputText={text => {
                      setSelectedChargeLine(
                        currentChargeLine.filter(line =>
                          line.designation.includes(text)
                        )
                      )
                    }}
                    searchInputTxtStyle={{ fontFamily: "Sora" }}
                    renderSearchInputRightIcon={() => (
                      <Icon size={24} source="magnify" color={colors.primary} />
                    )}
                    buttonTextAfterSelection={selectedItem =>
                      selectedItem.designation
                    }
                    rowTextForSelection={item => item.designation}
                    dropdownIconPosition="right"
                    renderDropdownIcon={() => (
                      <Icon
                        size={24}
                        source="menu-down"
                        color={
                          errors.chargeLines ? colors.error : colors.primary
                        }
                      />
                    )}
                    onBlur={() => handleBlur("chargeLines")}
                  />
                </View>
                {errors.chargeLines && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.chargeLines)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

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

            <View style={styles.field}>
              <View style={styles.screen}>
                <View>
                  <TextInput
                    placeholder={locale.t("pages.description")}
                    label={locale.t("pages.description")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.description}
                    onBlur={handleBlur("description")}
                    onChangeText={handleChange("description")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={!!errors.description && !!touched.description}
                  />
                </View>
                {errors.description && touched.description && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.description)}
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
                {locale.t(`pages.createNewChargeType`)}
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

export default ChargeTypesForm
