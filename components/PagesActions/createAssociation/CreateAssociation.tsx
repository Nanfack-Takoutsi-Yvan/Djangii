import { Formik, useFormikContext } from "formik"
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import SelectDropdown from "react-native-select-dropdown"

import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"
import AppStateContext from "@services/context/context"
import Association from "@services/models/associations/association"
import { useAppDispatch } from "@services/store"
import { fetchUserAssociations } from "@services/store/slices/associations/associations"
import {
  changeBottomSheetFormPosition,
  getBottomSheetForm
} from "@services/store/slices/bottomSheetForm"
import {
  fetchCurrencies,
  getAllCurrencies
} from "@services/store/slices/utils/currency"
import { associationValidationSchema } from "@services/validations/yup/association.validation"
import UserAssociation from "@services/models/associations/userAssociations"
import PageActionTitle from "@components/ui/PageActionTitle"

type Values = { id: string; name: string; acronym: string; currency: string }

const CreateAssociation: FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<ICurrency[]>([])

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const selectInputRef = useRef<SelectDropdown>(null)
  const { locale, setActionModalProps, setLoading } =
    useContext(AppStateContext)

  const currencies = getAllCurrencies()
  const { currentData }: { currentData?: UserAssociation } =
    getBottomSheetForm()

  const UpdateFields = () => {
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
      if (currentData) {
        setFieldValue("name", currentData.association.name, true)
        setFieldValue("acronym", currentData.association.acronym, true)
        setFieldValue("id", currentData.association.id, false)
        if (selectInputRef.current) {
          selectInputRef.current.selectIndex(
            selectedCurrencies.findIndex(
              el => el.id === currentData.association.currency.id
            )
          )
          setFieldValue("currency", currentData.association.currency.id, true)
        }
      } else {
        setFieldValue("name", "", false)
        setFieldValue("acronym", "", false)
        setFieldValue("id", "", false)
        if (selectInputRef.current) {
          selectInputRef.current.reset()
          setFieldValue("currency", "", false)
        }
      }
    }, [setFieldValue])
    return null
  }

  const createAssociation = useCallback(
    async (values: Values, { resetForm }: { resetForm: () => void }) => {
      setLoading(true)
      const tempCurrency = selectedCurrencies.find(
        cur => cur.id === values.currency
      )
      if (tempCurrency) {
        const association = {
          id: values.id,
          name: values.name,
          acronym: values.acronym,
          currency: tempCurrency
        }

        Association.createAssociation(association)
          .then(() => {
            setActionModalProps({
              icon: true,
              state: "success",
              shouldDisplay: true,
              title: locale.t(
                currentData
                  ? "pages.associationUpdated"
                  : "pages.associationCreated"
              )
            })

            resetForm()
            dispatch(changeBottomSheetFormPosition(-1))
            dispatch(fetchUserAssociations())
          })
          .catch(() =>
            setActionModalProps({
              icon: true,
              state: "error",
              shouldDisplay: true,
              title: locale.t("commonErrors.title"),
              description: locale.t("commonErrors.description")
            })
          )
          .finally(() => setLoading(false))
      }
    },
    [
      currentData,
      dispatch,
      locale,
      selectedCurrencies,
      setActionModalProps,
      setLoading
    ]
  )

  useEffect(() => {
    if (currencies.data.length === 0) {
      dispatch(fetchCurrencies())
    }
  }, [currencies.data?.length, dispatch])

  useEffect(() => {
    if (currencies.data.length !== 0) {
      setSelectedCurrencies(currencies.data)
    }
  }, [currencies.data])

  if (currencies.loading) {
    return <FormSkeletonLoader />
  }

  return (
    <View style={styles.screen}>
      <PageActionTitle
        text={locale.t(
          currentData ? "pages.updateAssociation" : "pages.newAssociation"
        )}
        icon="account-multiple-plus"
      />
      <View>
        <Formik
          initialValues={{
            id: "",
            name: "",
            acronym: "",
            currency: ""
          }}
          validationSchema={associationValidationSchema}
          onSubmit={createAssociation}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <View style={{ rowGap: 24 }}>
              <View style={styles.fieldsContainer}>
                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        placeholder={locale.t("tables.name")}
                        label={locale.t("tables.name")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={values.name}
                        onBlur={handleBlur("name")}
                        onChangeText={handleChange("name")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="name-family"
                        error={!!errors.name && !!touched.name}
                      />
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
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <View>
                      <TextInput
                        label={locale.t("tables.acronym")}
                        placeholder={locale.t("tables.acronym")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        value={values.acronym}
                        onBlur={handleBlur("acronym")}
                        onChangeText={handleChange("acronym")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="name-family"
                        error={!!errors.acronym && !!touched.acronym}
                      />
                      {errors.acronym && touched.acronym && (
                        <View>
                          <Text
                            style={{
                              color: colors.error
                            }}
                          >
                            {locale.t(errors.acronym)}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.field}>
                  <View style={styles.screen}>
                    <SelectDropdown
                      ref={selectInputRef}
                      data={selectedCurrencies}
                      defaultButtonText={locale.t("common.selectCurrency")}
                      buttonStyle={{
                        ...styles.uniqueDropdown,
                        borderBottomColor: errors.currency
                          ? colors.error
                          : "rgba(0,0,0,0.2)"
                      }}
                      buttonTextStyle={{
                        ...styles.dropdownTextStyles,
                        color: errors.currency ? colors.error : undefined
                      }}
                      rowTextStyle={styles.dropdownTextStyles}
                      dropdownStyle={{ borderRadius: 12 }}
                      onSelect={item => {
                        handleChange("currency")(item.id)
                      }}
                      search
                      searchInputTxtStyle={{ fontFamily: "Sora" }}
                      buttonTextAfterSelection={selectedItem =>
                        `${selectedItem.code} (${selectedItem.countryCode})`
                      }
                      rowTextForSelection={item =>
                        `${item.code} (${item.countryCode})`
                      }
                      onChangeSearchInputText={text => {
                        setSelectedCurrencies(
                          currencies.data.filter(currentCurrency =>
                            currentCurrency.code.includes(text.toUpperCase())
                          )
                        )
                      }}
                    />
                    {errors.currency && (
                      <View>
                        <Text
                          style={{
                            color: colors.error
                          }}
                        >
                          {locale.t(errors.currency)}
                        </Text>
                      </View>
                    )}
                  </View>
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
                  {locale.t(
                    currentData
                      ? "pages.updateAssociation"
                      : "pages.newAssociation"
                  )}
                </Button>
              </View>

              <UpdateFields />
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
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
  fieldsContainer: {
    flex: 1,
    rowGap: 12
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
  }
})

export default CreateAssociation
