import { FC, useCallback, useContext, useEffect, useState } from "react"
import { Button, Text, TextInput, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { useAppDispatch } from "@services/store"
import { StyleSheet, View } from "react-native"
import { Formik } from "formik"
import SelectDropdown from "react-native-select-dropdown"
import FREQUENCIES from "@assets/constants/dashboard/frequencies"
import { tontineRoundValidation } from "@services/validations/yup/inviteMember.validation"
import Icon from "react-native-paper/src/components/Icon"
import { getDefaultAssociationId } from "@services/store/slices/dashboard"
import { associationSelector } from "@services/store/slices/associations"
import Tontine from "@services/models/tontine/tontine"
import { fetchTontineList } from "@services/store/slices/tontines/tontine"

const FormDefault = {
  name: "",
  amount: 0,
  frequency: 0,
  value: ""
}

const TontineContribution: FC<DashboardPagesCreationProps> = ({ pageName }) => {
  const [association, setAssociation] = useState<IAssociation>()
  const [selectedFrequency, setSelectedFrequencies] = useState<
    typeof FREQUENCIES
  >([])

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const associationId = getDefaultAssociationId()
  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const {
    data: { createdAssociation: associations }
  } = associationSelector.getAssociations()

  const createTontine = useCallback(
    (values: typeof FormDefault, { resetForm }: { resetForm: () => void }) => {
      if (association) {
        setLoading(true)
        const payload: NewTontine = {
          name: values.name,
          amount: values.amount,
          periodicity: {
            value: values.value,
            frequency: values.frequency
          },
          association,
          type:
            pageName === "fixedAmount"
              ? "CONTRIBUTION"
              : "VARIABLE_CONTRIBUTION"
        }

        Tontine.createTontine(payload)
          .then(() => {
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t("pages.newTontineCreated")
            })

            resetForm()
            if (association) {
              dispatch(fetchTontineList(association.id))
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
    [association, dispatch, locale, pageName, setActionModalProps, setLoading]
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
  }, [])

  return (
    <View style={styles.singleMemberContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newTontine`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon source="piggy-bank-outline" size={32} color={colors.primary} />
        </View>
      </View>

      <Formik
        validationSchema={tontineRoundValidation}
        onSubmit={createTontine}
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
                    placeholder={locale.t("pages.name")}
                    label={locale.t("pages.name")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="default"
                    value={values.name}
                    onBlur={handleBlur("name")}
                    onChangeText={handleChange("name")}
                    style={styles.textInput}
                    dense
                    underlineColor="rgba(0,0,0,0.5)"
                    autoComplete="username"
                    error={!!errors.name && !!touched.name}
                  />
                </View>
                {errors.name && touched.name && (
                  <View>
                    <Text
                      style={{
                        color: colors.error
                      }}
                    >
                      {locale.t(errors.name)}
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
                    keyboardType="number-pad"
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
                {locale.t("pages.frequencyTitle")}
              </Text>
            </View>

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

            <View>
              <Button
                mode="contained"
                textColor={colors.surface}
                onPress={() => {
                  handleSubmit()
                }}
              >
                {locale.t(`pages.createNewTontine`)}
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
  }
})

export default TontineContribution
