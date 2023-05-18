import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image
} from "react-native"

import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

import { Formik } from "formik"
import { useContext, useState } from "react"
import { useRouter } from "expo-router"

import AppStateContext from "@services/context/context"
import PasswordIcon from "@components/ui/PasswordIcon"
import PhoneInput from "react-native-phone-input"
import User from "@services/models/user"
import LoadingModal from "@components/ui/LoadingModal"

export default function SignUp() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)
  const [isOtpSending, setIsOtpSending] = useState<boolean>(false)

  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  const router = useRouter()

  type payload = {
    username: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    passwordConfirm: string
  }

  const sendOTP = async (values: payload, lang?: string) => {
    const otpSent = await User.sendOTP(values.email, lang)

    if (otpSent) {
      router.replace({ pathname: "checkEmail", params: values })
    }
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
        <LoadingModal displayModal={isOtpSending} />
        <StatusBar barStyle="light-content" />
        <View style={styles.titleContainer}>
          <Text variant="headlineMedium" style={{ color: colors.surface }}>
            {locale.t("login.connection")}
          </Text>
          <Icon source="login" size={32} color="#90F800" />
        </View>
        <View style={styles.formContainer}>
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.screen}
          >
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
              onSubmit={values => {
                setIsOtpSending(true)
                sendOTP(values, locale.locale)
                  // eslint-disable-next-line no-console
                  .catch(err => console.log(err))
                  .finally(() => setIsOtpSending(false))
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>
                  <View style={styles.field}>
                    <Icon
                      source="account-outline"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t("signUp.labels.username")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="name-phone-pad"
                        value={values.username}
                        onBlur={handleBlur("username")}
                        onChangeText={handleChange("username")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="username"
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon
                      source="account-outline"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
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
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon
                      source="account-outline"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
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
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon source="at" color={colors.primary} size={40} />
                    <View style={styles.screen}>
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
                      />
                    </View>
                  </View>

                  <PhoneInput
                    autoFormat
                    offset={24}
                    initialCountry="cm"
                    flagStyle={styles.flagStyle}
                    allowZeroAfterCountryCode={false}
                    confirmText={locale.t("signUp.pickerConfirm")}
                    cancelText={locale.t("signUp.pickerCancel")}
                    textStyle={styles.phoneInputTextStyle}
                    confirmTextStyle={styles.phoneInputConfirmTextStyle}
                    cancelTextStyle={styles.phoneInputCancelTextStyle}
                    renderFlag={({ imageSource }) => (
                      <View>
                        <Image
                          source={require("../../assets/images/icons/chevron-down.png")}
                          style={styles.flagChevronDown}
                        />
                        <Image source={imageSource} style={styles.flag} />
                      </View>
                    )}
                  />

                  <View style={styles.field}>
                    <Icon
                      source="form-textbox-password"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t("login.labels.password")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="visible-password"
                        value={values.password}
                        onBlur={handleBlur("password")}
                        onChangeText={handleChange("password")}
                        style={styles.textInput}
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        autoComplete="password"
                        secureTextEntry
                        right={
                          <PasswordIcon
                            showEye={isPasswordHidden}
                            toggleEye={setIsPasswordHidden}
                          />
                        }
                      />
                    </View>
                  </View>

                  <View style={styles.field}>
                    <Icon
                      source="form-textbox-password"
                      color={colors.primary}
                      size={40}
                    />
                    <View style={styles.screen}>
                      <TextInput
                        placeholder={locale.t("signUp.labels.confirmPassword")}
                        placeholderTextColor="rgba(0, 0, 0, 0.20)"
                        keyboardType="visible-password"
                        value={values.passwordConfirm}
                        onBlur={handleBlur("passwordConfirm")}
                        onChangeText={handleChange("passwordConfirm")}
                        style={styles.textInput}
                        autoComplete="password"
                        dense
                        underlineColor="rgba(0,0,0,0.5)"
                        secureTextEntry
                        right={
                          <PasswordIcon
                            showEye={isPasswordHidden}
                            toggleEye={setIsPasswordHidden}
                          />
                        }
                      />
                    </View>
                  </View>

                  <View style={styles.screen}>
                    <Button
                      mode="contained"
                      textColor={colors.surface}
                      onPress={() => handleSubmit()}
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
          </ScrollView>
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
  fieldContainer: {
    backgroundColor: "transparent",
    rowGap: 12
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
    borderRadius: 5
  },
  phoneInputTextStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: "SoraMedium",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 1,
    marginBottom: 1
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
    alignItems: "center"
  }
})
