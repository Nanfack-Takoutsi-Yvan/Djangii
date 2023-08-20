import { Formik } from "formik"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import SelectDropdown from "react-native-select-dropdown"

import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"
import AppStateContext from "@services/context/context"
import Association from "@services/models/associations/association"
import { useAppDispatch } from "@services/store"
import { fetchUserAssociations } from "@services/store/slices/associations/associations"
import { changeBottomSheetFormPosition } from "@services/store/slices/bottomSheetForm"
import {
  fetchCurrencies,
  getAllCurrencies
} from "@services/store/slices/utils/currency"
import { associationValidationSchema } from "@services/validations/yup/association.validation"

type Values = { name: string; acronym: string; currency: string }

const CreateAssociation: FC = () => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<ICurrency[]>([])

  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale, setActionModalProps, setLoading } =
    useContext(AppStateContext)

  const currencies = getAllCurrencies()

  const createAssociation = useCallback(
    async (values: Values, { resetForm }: { resetForm: () => void }) => {
      setLoading(true)
      const tempCurrency = selectedCurrencies.find(
        cur => cur.id === values.currency
      )
      if (tempCurrency) {
        const association = {
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
              title: locale.t("pages.associationCreated")
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
    [dispatch, locale, selectedCurrencies, setActionModalProps, setLoading]
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
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">{locale.t(`pages.newAssociation`)}</Text>
        </View>
        <View style={styles.titleIcon}>
          <Icon
            source="account-multiple-plus"
            size={32}
            color={colors.secondary}
          />
        </View>
      </View>
      <View>
        <Formik
          initialValues={{
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
                      onSelect={item => handleChange("currency")(item.id)}
                      search
                      searchInputTxtStyle={{ fontFamily: "Sora" }}
                      buttonTextAfterSelection={selectedItem =>
                        selectedItem.code
                      }
                      rowTextForSelection={item => item.code}
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
                  {locale.t("pages.createAssociation")}
                </Button>
              </View>
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
