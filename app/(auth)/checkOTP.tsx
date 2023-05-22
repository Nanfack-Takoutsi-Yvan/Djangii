/* eslint-disable no-console */
import {
  View,
  Platform,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native"

import Icon from "react-native-paper/src/components/Icon"
import { Text, TextInput, Button, useTheme } from "react-native-paper"

import { Formik } from "formik"
import { useContext } from "react"
import { useRouter, useLocalSearchParams } from "expo-router"

import User from "@services/models/user"
import AppStateContext from "@services/context/context"
import { NewUserData, userFormInputs } from "@services/types/auth"

import { StatusBar } from "expo-status-bar"
import validations from "@services/validations"
import StatusesHttp from "@constants/Statuses.http"

export default function CheckOTP() {
  const { colors } = useTheme()
  const { locale, setUser, setLoading, setActionModalProps } =
    useContext(AppStateContext)

  type Params = { values: string }

  const params = useLocalSearchParams() as Params
  // const router = useRouter()

  const userInfos = JSON.parse(
    decodeURIComponent(params.values)
  ) as userFormInputs

  const validateOTP = async ({ otp }: { otp: string }) => {
    setLoading(true)

    const countryCode = userInfos.phoneNumber.split(",")[1].toLocaleUpperCase()
    const phone = userInfos.phoneNumber.split(",")[0].split(" ").join("")
    const email = decodeURIComponent(userInfos.email)

    const newUser: NewUserData = {
      password: userInfos.password,
      userInfos: {
        countryCode,
        email,
        firstName: userInfos.firstName,
        lang: locale.locale.split("-")[0],
        lastName: userInfos.lastName,
        phone
      },
      username: userInfos.username
    }

    User.validateOTP(userInfos.email, otp)
      .then(isOTPValid => {
        if (isOTPValid) {
          User.register(newUser, otp)
            .then(user => {
              setUser(user)
            })
            .catch(() => {
              setLoading(false)

              setActionModalProps({
                icon: true,
                state: "error",
                shouldDisplay: true,
                title: locale.t("commonErrors.title"),
                description: locale.t("commonErrors.description")
              })
            })
            .finally(() => {
              setLoading(false)
            })
        }
      })
      .catch(err => {
        console.log("error occurred when validating the otp", err)
        const error = JSON.parse(err.message)
        const error400 = error.error.status === StatusesHttp.badRequest

        setLoading(false)

        setActionModalProps({
          icon: true,
          state: "error",
          shouldDisplay: true,
          title: locale.t(
            error400 ? "commonErrors.badOtp" : "commonErrors.title"
          ),
          description: error400 ? "" : locale.t("commonErrors.description")
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const resentOTP = async () => {
    setLoading(true)
    User.sendOTP(userInfos.email, locale.locale)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log("An error occurred white sending otp: ", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      contentContainerStyle={styles.screen}
      behavior="height"
    >
      <ImageBackground
        style={styles.screen}
        source={require("../../assets/images/screens/background.png")}
      >
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("checkOTP.title")}
          </Text>
          <Icon source="email-check-outline" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validations.otpValidationSchema}
            onSubmit={validateOTP}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched
            }) => (
              <View style={styles.form}>
                <View style={styles.screen}>
                  <Text variant="titleMedium">
                    {locale.t("checkOTP.indication")}{" "}
                    <Text
                      variant="titleMedium"
                      style={{ color: colors.primary }}
                    >
                      {userInfos?.email}
                    </Text>
                  </Text>
                </View>

                <View style={styles.fieldContainer}>
                  <Text variant="labelLarge">
                    {locale.t("checkOTP.labels.otpCheck")}
                  </Text>
                  <View style={styles.field}>
                    <Icon
                      source="email-check-outline"
                      color={
                        errors.otp && touched.otp
                          ? colors.error
                          : colors.primary
                      }
                      size={40}
                    />
                    <View style={styles.screen}>
                      <View style={styles.screen}>
                        <TextInput
                          placeholder={locale.t("checkOTP.labels.otpCheck")}
                          placeholderTextColor="rgba(0, 0, 0, 0.20)"
                          keyboardType="numeric"
                          value={values.otp}
                          onBlur={handleBlur("otp")}
                          onChangeText={handleChange("otp")}
                          style={styles.textInput}
                          autoComplete="sms-otp"
                          dense
                          underlineColor="rgba(0,0,0,0.5)"
                          error={!!errors.otp && touched.otp}
                        />
                      </View>
                      {errors.otp && touched.otp && (
                        <View style={styles.errorContainer}>
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
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    textColor={colors.surface}
                    onPress={() => {
                      handleSubmit()
                      console.log("helloworld")
                    }}
                    contentStyle={styles.signUpButton}
                    icon={() => (
                      <Icon
                        source="chevron-right"
                        size={32}
                        color={colors.secondary}
                      />
                    )}
                  >
                    {locale.t("checkOTP.cta")}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30,
            flexDirection: "row"
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: colors.surface, fontFamily: "SoraMedium" }}
          >
            {locale.t("checkOTP.resendTitle")}
          </Text>
          <Button
            mode="text"
            textColor={colors.secondary}
            labelStyle={{ fontSize: 16, fontFamily: "SoraMedium" }}
            onPress={resentOTP}
          >
            {locale.t("checkOTP.resend")}
          </Button>
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
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30
  },
  form: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30
  },
  fieldContainer: {
    rowGap: 12,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 12
  },
  textInputContainer: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    borderBottomColor: "rgba(0,0,0,0.5)"
  },
  textInput: {
    paddingHorizontal: 0
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingVertical: 4,
    marginBottom: 0
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  errorContainer: {
    top: 24
  }
})
