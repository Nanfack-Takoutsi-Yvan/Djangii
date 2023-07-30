import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { Formik } from "formik"
import { Button, Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { useRouter } from "expo-router"
import { htmlToText } from "html-to-text"
import MultiSelect from "react-native-multiple-select"
import SelectDropdown from "react-native-select-dropdown"
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native"

import { useAuth } from "@services/context/auth"
import validations from "@services/validations"
import AppStateContext from "@services/context/context"
import { getDate } from "@services/utils/functions/format"
import {
  djangiiDataSelector,
  djangiiDataActions
} from "@services/store/slices/djangiiData"
import { useAppDispatch } from "@services/store"
import FormSkeletonLoader from "@components/ui/skeletonLoader/formSkeletonLoader"

const UpdateAccount: FC = () => {
  const [dateToggler, setDateToggler] = useState<Date>()
  const [showPicker, setShowPicker] = useState<boolean>(false)

  const { user } = useAuth()
  const router = useRouter()
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const { locale } = useContext(AppStateContext)
  const cities = djangiiDataSelector.getCitiesState()
  const djangiiData = djangiiDataSelector.getDjangiiDataState()

  const triggerDispatch = useRef<boolean>(true)
  const triggerDispatchUsers = useRef<boolean>(true)

  useEffect(() => {
    if (triggerDispatch.current) {
      dispatch(djangiiDataActions.fetchAllDjangiiData())
      triggerDispatch.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (triggerDispatchUsers.current && user) {
      dispatch(djangiiDataActions.fetchCities(user.userInfos.countryCode))
      triggerDispatchUsers.current = false
    }
  }, [dispatch, user])

  const description = htmlToText(user?.userInfos.socialProfil.biography ?? "")

  const toggleDatePicker = () => setShowPicker(currentValue => !currentValue)
  const updateCities = useCallback(
    (countryCode: string) => {
      dispatch(djangiiDataActions.fetchCities(countryCode))
    },
    [dispatch]
  )
  const onChangeDate = (
    event: DateTimePickerEvent,
    value: Date | undefined
  ) => {
    if (event.type === "set" && value) {
      setDateToggler(value)

      return
    }
    toggleDatePicker()
  }

  if (djangiiData.loading) {
    return <FormSkeletonLoader />
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.section}>
            <Text variant="labelLarge">{locale.t("settings.userDetails")}</Text>
            <View style={styles.form}>
              <Formik
                initialValues={{
                  description,
                  firstName: user?.userInfos.firstName,
                  lastName: user?.userInfos.lastName,
                  dateOfBirth: new Date(
                    user?.userInfos.socialProfil.dateBirth ?? ""
                  ).toUTCString()
                }}
                onSubmit={console.log}
                validationSchema={validations.userDetailsValidationSchema}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  resetForm
                }) => (
                  <View style={styles.sectionForm}>
                    <View style={styles.formCard}>
                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="account-outline"
                            color={
                              errors.firstName && touched.firstName
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.firstName")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("signUp.labels.firstName")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="name-phone-pad"
                              value={values.firstName}
                              onBlur={handleBlur("firstName")}
                              onChangeText={handleChange("firstName")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="name-given"
                              error={!!errors.firstName && !!touched.firstName}
                            />
                          </View>
                          {errors.firstName && touched.firstName && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.firstName)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="account-outline"
                            color={
                              errors.lastName && touched.lastName
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.lastName")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.firstName")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              keyboardType="name-phone-pad"
                              value={values.lastName}
                              onBlur={handleBlur("lastName")}
                              onChangeText={handleChange("lastName")}
                              style={styles.textInput}
                              dense
                              underlineColor="rgba(0,0,0,0.5)"
                              autoComplete="name-given"
                              error={!!errors.lastName && !!touched.lastName}
                            />
                          </View>
                          {errors.lastName && touched.lastName && (
                            <View>
                              <Text
                                style={{
                                  color: colors.error
                                }}
                              >
                                {locale.t(errors.lastName)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={styles.field}>
                        <View style={styles.label}>
                          <Icon
                            source="card-account-details-outline"
                            color={
                              errors.description && touched.description
                                ? colors.error
                                : colors.primary
                            }
                            size={24}
                          />
                          <Text>{locale.t("settings.description")}</Text>
                        </View>
                        <View style={styles.field}>
                          <View>
                            <TextInput
                              placeholder={locale.t("settings.description")}
                              placeholderTextColor="rgba(0, 0, 0, 0.20)"
                              value={values.description}
                              onBlur={handleBlur("description")}
                              onChangeText={handleChange("description")}
                              style={styles.textInput}
                              multiline
                              underlineColor="rgba(0,0,0,0.5)"
                              error={
                                !!errors.description && !!touched.description
                              }
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

                      {!showPicker ? (
                        <TouchableOpacity
                          style={styles.field}
                          onPress={toggleDatePicker}
                        >
                          <View style={styles.label}>
                            <Icon
                              source="cake-variant-outline"
                              color={
                                errors.dateOfBirth && touched.dateOfBirth
                                  ? colors.error
                                  : colors.primary
                              }
                              size={24}
                            />
                            <Text>{locale.t("common.dateOfBirth")}</Text>
                          </View>
                          <View style={styles.field}>
                            <View>
                              <TextInput
                                placeholder={locale.t("common.dateOfBirth")}
                                placeholderTextColor="rgba(0, 0, 0, 0.20)"
                                value={getDate(values.dateOfBirth)}
                                onBlur={handleBlur("dateOfBirth")}
                                onChangeText={handleChange("dateOfBirth")}
                                style={styles.textInput}
                                dense
                                onPressOut={toggleDatePicker}
                                editable={false}
                                underlineColor="rgba(0,0,0,0.5)"
                                error={
                                  !!errors.dateOfBirth && !!touched.dateOfBirth
                                }
                              />
                            </View>
                            {errors.dateOfBirth && touched.dateOfBirth && (
                              <View>
                                <Text
                                  style={{
                                    color: colors.error
                                  }}
                                >
                                  {locale.t(errors.dateOfBirth)}
                                </Text>
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      ) : null}

                      {showPicker ? (
                        <View>
                          <DateTimePicker
                            mode="date"
                            display="spinner"
                            value={new Date(values.dateOfBirth)}
                            onChange={(evt, date) => onChangeDate(evt, date)}
                            textColor={colors.primary}
                            maximumDate={new Date()}
                            onTouchCancel={toggleDatePicker}
                          />
                          {Platform.OS === "ios" ? (
                            <View style={styles.dateTimeButton}>
                              <Button
                                mode="contained"
                                buttonColor="#ccc"
                                onPress={() => {
                                  setDateToggler(undefined)
                                  toggleDatePicker()
                                }}
                              >
                                {locale.t("settings.cancel")}
                              </Button>
                              <Button
                                mode="contained"
                                textColor="#fff"
                                onPress={() => {
                                  if (dateToggler) {
                                    handleChange("dateOfBirth")(
                                      dateToggler.toDateString()
                                    )
                                  }
                                  toggleDatePicker()
                                }}
                              >
                                {locale.t("common.confirm")}
                              </Button>
                            </View>
                          ) : null}
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button
                        mode="contained"
                        buttonColor="#ccc"
                        icon="close"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => {
                          resetForm()
                          router.back()
                        }}
                      >
                        {locale.t("settings.cancel")}
                      </Button>
                      <Button
                        mode="contained"
                        textColor="#fff"
                        icon="badge-account-outline"
                        contentStyle={{ flexDirection: "row-reverse" }}
                        onPress={() => {
                          if (values) {
                            handleSubmit()
                          }
                        }}
                      >
                        {locale.t("settings.updateProfileInfo")}
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  mainContainer: {
    padding: 24
  },
  container: {
    flex: 1,
    borderRadius: 24,
    rowGap: 24
  },
  section: {
    rowGap: 12
  },
  sectionForm: {
    rowGap: 18
  },
  form: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 30
  },
  buttonContainer: {
    rowGap: 12,
    flexDirection: "column-reverse"
  },
  formCard: {
    backgroundColor: "transparent",
    rowGap: 12,
    flex: 3
  },
  fieldsContainer: {
    flex: 1
  },
  field: {
    rowGap: 4
  },
  textInput: {
    paddingHorizontal: 0
  },
  label: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center"
  },
  dateTimeButton: {
    justifyContent: "space-around",
    flexDirection: "row"
  }
})

export default UpdateAccount
