/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  View,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { HttpStatusCode } from "axios"
import { useRouter } from "expo-router"
import { Formik, useField } from "formik"
import { StatusBar } from "expo-status-bar"
import { forwardRef, useContext, useRef, useState } from "react"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"
import PhoneInput from "react-native-phone-input"
import User from "@services/models/user"
import LoadingModal from "@components/ui/LoadingModal"

import validations from "@services/validations"

export default function SignUp() {
  const [isOtpSending, setIsOtpSending] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState<boolean>(false)

  const { locale, setLoading, setActionModalProps } =
    useContext(AppStateContext)
  const { colors } = useTheme()

  const router = useRouter()

  const phoneInputRef = useRef<any>(null)

  const CustomPhoneInput = forwardRef((props, ref) => {
    const [field, meta] = useField({ name: "phoneNumber" })

    return (
      <View>
        <TextInput
          {...props}
          placeholderTextColor="rgba(0, 0, 0, 0.20)"
          style={styles.textInput}
          dense
          underlineColor="rgba(0,0,0,0.5)"
          autoComplete="tel"
          onBlur={field.onBlur("phoneNumber")}
          error={!!meta.error && !!meta.touched}
          ref={ref as any}
        />
        {meta.error && meta.touched && (
          <View>
            <Text
              style={{
                color: colors.error
              }}
            >
              {locale.t(meta.error)}
            </Text>
          </View>
        )}
      </View>
    )
  })

  const sendOTP = async (values: userFormInputs, lang?: string) => {
    setLoading(true)
    User.sendOTP(values.email, lang)
      .then(otpSent => {
        if (otpSent)
          router.replace({
            pathname: "checkOTP",
            params: { values: encodeURIComponent(JSON.stringify(values)) }
          })
      })
      .catch(err => {
        const error = JSON.parse(err.message)
        const error429 = error.error.status === HttpStatusCode.TooManyRequests

        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t(
            error429 ? "commonErrors.tooManyAttempts" : "commonErrors.title"
          ),
          description: error429 ? "" : locale.t("commonErrors.description")
        })
      })
      .finally(() => setLoading(false))
  }

  const vaidateFormik = async (values: userFormInputs) => {
    setIsOtpSending(true)
    sendOTP(values, locale.locale.split("-")[0])
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
      .finally(() => setIsOtpSending(false))
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        <LoadingModal displayModal={isOtpSending} />
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("signUp.signUp")}
          </Text>
          <Icon source="account-check-outline" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              password: "",
              passwordConfirm: ""
            }}
            validationSchema={validations.signUpValidationSchema}
            onSubmit={vaidateFormik}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched
            }) => (
              <View style={{ flex: 6 }}>
                <ScrollView
                  style={styles.screen}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={styles.form}>
                    <View style={styles.field}>
                      <Icon
                        source="account-outline"
                        color={
                          errors.username && touched.username
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
                        <View>
                          <TextInput
                            placeholder={locale.t("signUp.labels.username")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType="default"
                            value={values.username}
                            onBlur={handleBlur("username")}
                            onChangeText={handleChange("username")}
                            style={styles.textInput}
                            dense
                            underlineColor="rgba(0,0,0,0.5)"
                            autoComplete="username"
                            error={!!errors.username && !!touched.username}
                          />
                        </View>
                        {errors.username && touched.username && (
                          <View>
                            <Text
                              style={{
                                color: colors.error
                              }}
                            >
                              {locale.t(errors.username)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.field}>
                      <Icon
                        source="account-outline"
                        color={
                          errors.firstName && touched.firstName
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
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
                      <Icon
                        source="account-outline"
                        color={
                          errors.lastName && touched.lastName
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
                        <View>
                          <TextInput
                            placeholder={locale.t("signUp.labels.lastName")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType="name-phone-pad"
                            value={values.lastName}
                            onBlur={handleBlur("lastName")}
                            onChangeText={handleChange("lastName")}
                            style={styles.textInput}
                            dense
                            underlineColor="rgba(0,0,0,0.5)"
                            autoComplete="name-family"
                            error={!!errors.lastName && !!touched.lastName}
                          />
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
                    </View>

                    <View style={styles.field}>
                      <Icon
                        source="at"
                        color={
                          errors.email && touched.email
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
                        <View>
                          <TextInput
                            placeholder={locale.t("signUp.labels.email")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType="email-address"
                            value={values.email}
                            onBlur={handleBlur("email")}
                            dense
                            underlineColor="rgba(0,0,0,0.5)"
                            onChangeText={handleChange("email")}
                            style={styles.textInput}
                            autoComplete="email"
                            error={!!errors.email && touched.email}
                          />
                        </View>
                        {errors.email && touched.email && (
                          <View>
                            <Text
                              style={{
                                color: colors.error
                              }}
                            >
                              {locale.t(errors.email)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <PhoneInput
                      autoFormat
                      offset={20}
                      initialCountry="cm"
                      flagStyle={styles.flagStyle}
                      allowZeroAfterCountryCode={false}
                      onChangePhoneNumber={(value, iso) => {
                        handleChange("phoneNumber")(`${value},${iso}`)
                      }}
                      confirmText={locale.t("signUp.pickerConfirm")}
                      cancelText={locale.t("signUp.pickerCancel")}
                      textStyle={
                        errors.phoneNumber && touched.phoneNumber
                          ? styles.phoneInputErrorState
                          : styles.phoneInputTextStyle
                      }
                      confirmTextStyle={styles.phoneInputConfirmTextStyle}
                      cancelTextStyle={styles.phoneInputCancelTextStyle}
                      renderFlag={({ imageSource }) => (
                        <View>
                          <Image
                            source={require("../../assets/images/icons/chevron-down.png")}
                            style={styles.flagChevronDown}
                          />
                          <Image
                            source={imageSource}
                            style={[
                              styles.flag,
                              errors.phoneNumber && touched.phoneNumber
                                ? styles.flagError
                                : undefined
                            ]}
                          />
                        </View>
                      )}
                      textComponent={CustomPhoneInput}
                      ref={phoneInputRef}
                    />

                    <View style={styles.field}>
                      <Icon
                        source="form-textbox-password"
                        color={
                          errors.password && touched.password
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
                        <View>
                          <TextInput
                            placeholder={locale.t("login.labels.password")}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType={
                              Platform.OS === "ios"
                                ? "visible-password"
                                : "default"
                            }
                            value={values.password}
                            onBlur={handleBlur("password")}
                            onChangeText={handleChange("password")}
                            style={styles.textInput}
                            dense
                            underlineColor="rgba(0,0,0,0.5)"
                            autoComplete="password-new"
                            secureTextEntry={!showPassword}
                            error={!!errors.password && touched.password}
                            right={PasswordIcon.bind(null, {
                              onToggleVisibility: () =>
                                setShowPassword(oldValue => !oldValue)
                            })()}
                          />
                        </View>
                        {errors.password && touched.password && (
                          <View>
                            <Text
                              style={{
                                color: colors.error
                              }}
                            >
                              {locale.t(errors.password)}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                    <View style={styles.field}>
                      <Icon
                        source="form-textbox-password"
                        color={
                          errors.passwordConfirm && touched.passwordConfirm
                            ? colors.error
                            : colors.primary
                        }
                        size={40}
                      />
                      <View style={styles.screen}>
                        <View>
                          <TextInput
                            placeholder={locale.t(
                              "signUp.labels.confirmPassword"
                            )}
                            placeholderTextColor="rgba(0, 0, 0, 0.20)"
                            keyboardType={
                              Platform.OS === "ios"
                                ? "visible-password"
                                : "default"
                            }
                            value={values.passwordConfirm}
                            onBlur={handleBlur("passwordConfirm")}
                            onChangeText={handleChange("passwordConfirm")}
                            style={styles.textInput}
                            autoComplete="password-new"
                            dense
                            underlineColor="rgba(0,0,0,0.5)"
                            secureTextEntry={!showPasswordConfirm}
                            error={
                              !!errors.passwordConfirm &&
                              touched.passwordConfirm
                            }
                            right={PasswordIcon.bind(null, {
                              onToggleVisibility: () =>
                                setShowPasswordConfirm(oldValue => !oldValue)
                            })()}
                          />
                        </View>

                        {errors.passwordConfirm && touched.passwordConfirm && (
                          <View>
                            <Text
                              style={{
                                color: colors.error
                              }}
                            >
                              {locale.t(errors.passwordConfirm)}
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
                        contentStyle={styles.signUpButton}
                        loading={isOtpSending}
                        icon={() => (
                          <Icon
                            source="chevron-right"
                            size={32}
                            color={colors.secondary}
                          />
                        )}
                      >
                        {locale.t("signUp.signUp")}
                      </Button>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </Formik>

          <View style={styles.loginContainer}>
            <Text>{locale.t("signUp.existingAccount")}</Text>
            <Button
              mode="text"
              textColor={colors.tertiary}
              labelStyle={{ fontSize: 14 }}
              onPress={() => router.replace("login")}
            >
              {locale.t("signUp.connect")}
            </Button>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 40,
    columnGap: 16
  },
  title: {
    fontFamily: "SoraBold",
    fontSize: 24
  },
  formContainer: {
    backgroundColor: "white",
    flex: 6,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  form: {
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 30,
    rowGap: 24,
    flex: 3
  },
  fieldsContainer: {
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInput: {
    paddingHorizontal: 0
  },
  button: {
    alignItems: "flex-start"
  },
  buttonTitle: {
    textDecorationLine: "underline"
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4
  },
  flagStyle: { borderRadius: 5 },
  flagChevronDown: {
    position: "absolute",
    zIndex: 2,
    right: -4,
    bottom: -2
  },
  flag: {
    width: 28,
    height: 20,
    borderRadius: 5,
    marginLeft: 8
  },
  flagError: {
    borderWidth: 1,
    borderColor: "red"
  },
  phoneInputTextStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "SoraMedium",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginBottom: 1
  },
  phoneInputErrorState: {
    height: 40,
    fontSize: 16,
    fontFamily: "SoraMedium",
    borderBottomColor: "#F72706",
    borderBottomWidth: 1,
    marginBottom: 1,
    color: "#F72706"
  },
  phoneInputConfirmTextStyle: {
    fontFamily: "SoraMedium",
    color: "green"
  },
  phoneInputCancelTextStyle: {
    fontFamily: "SoraMedium",
    color: "red"
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  }
})
