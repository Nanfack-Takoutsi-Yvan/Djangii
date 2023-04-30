/* eslint-disable react/jsx-no-bind */
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView
} from "react-native"

import { Formik } from "formik"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import Colors from "@constants/Theme/Colors"
import { View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import Field from "@components/ui/Field"
import { Text, TextInput, Button } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { useRouter } from "expo-router"
import PhoneInput from "react-native-phone-input"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true)
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  function PasswordIcon(
    showPassword: boolean,
    setShowPassword: Dispatch<SetStateAction<boolean>>
  ) {
    function togglePasswordVisibility() {
      setShowPassword(currentValue => !currentValue)
    }

    return showPassword ? (
      <TextInput.Icon onPress={togglePasswordVisibility} icon="eye-outline" />
    ) : (
      <TextInput.Icon
        onPress={togglePasswordVisibility}
        icon="eye-off-outline"
      />
    )
  }

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{locale.t("signUp.signUp")}</Text>
        <Icon source="account-check" size={36} color="#90F800" />
      </View>
      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{
              userName: "",
              password: "",
              firstName: "",
              lastName: "",
              email: "",
              confirmPassword: "",
              phoneNumber: ""
            }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <TextInput
                  label={locale.t("signUp.labels.userName")}
                  placeholder={locale.t("signUp.labels.userName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="name-phone-pad"
                  value={values.userName}
                  onBlur={handleBlur("userName")}
                  onChangeText={handleChange("userName")}
                  style={{ backgroundColor: "transparent" }}
                  left={<TextInput.Icon icon="account-outline" />}
                />

                <TextInput
                  label={locale.t("signUp.labels.firstName")}
                  placeholder={locale.t("signUp.labels.firstName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="name-phone-pad"
                  value={values.firstName}
                  onBlur={handleBlur("firstName")}
                  onChangeText={handleChange("firstName")}
                  style={{ backgroundColor: "transparent" }}
                  left={<TextInput.Icon icon="account-outline" />}
                />

                <TextInput
                  label={locale.t("signUp.labels.lastName")}
                  placeholder={locale.t("signUp.labels.lastName")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="name-phone-pad"
                  value={values.lastName}
                  onBlur={handleBlur("lastName")}
                  onChangeText={handleChange("lastName")}
                  style={{ backgroundColor: "transparent" }}
                  left={<TextInput.Icon icon="account-outline" />}
                />

                <TextInput
                  label={locale.t("signUp.labels.email")}
                  placeholder={locale.t("signUp.labels.email")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="email-address"
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  style={{ backgroundColor: "transparent" }}
                  left={<TextInput.Icon icon="at" />}
                />

                <TextInput
                  label={locale.t("signUp.labels.phoneNumber")}
                  placeholder={locale.t("signUp.labels.phoneNumber")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="phone-pad"
                  value={values.email}
                  onBlur={handleBlur("phoneNumber")}
                  onChangeText={handleChange("phoneNumber")}
                  style={{ backgroundColor: "transparent" }}
                  // left={<TextInput.Icon icon="phone-outline" />}
                />
                <PhoneInput
                  initialCountry="cm"
                  autoFormat
                  flagStyle={{ borderRadius: 5 }}
                  allowZeroAfterCountryCode={false}
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    paddingLeft: 24
                  }}
                  textStyle={{
                    height: 44,
                    fontSize: 16,
                    fontFamily: "SoraMedium"
                  }}
                />

                <TextInput
                  placeholder={locale.t("signUp.labels.password")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="visible-password"
                  secureTextEntry={isPasswordHidden}
                  right={PasswordIcon(isPasswordHidden, setIsPasswordHidden)}
                  left={<TextInput.Icon icon="lock-outline" />}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  style={{ backgroundColor: "transparent" }}
                />

                <TextInput
                  placeholder={locale.t("signUp.labels.confirmPassword")}
                  placeholderTextColor="rgba(0, 0, 0, 0.20)"
                  keyboardType="visible-password"
                  secureTextEntry={isPasswordHidden}
                  right={PasswordIcon(
                    isPasswordConfirmationHidden,
                    setIsPasswordConfirmationHidden
                  )}
                  left={<TextInput.Icon icon="lock-outline" />}
                  value={values.confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  style={{ backgroundColor: "transparent" }}
                />

                <Field
                  iconColor="#532181"
                  secureTextEntry
                  iconSize={32}
                  value={values.password}
                  icon="form-textbox-password"
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  placeholder={locale.t("signUp.labels.password")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <Field
                  iconColor="#532181"
                  secureTextEntry
                  iconSize={32}
                  value={values.confirmPassword}
                  icon="form-textbox-password"
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder={locale.t("signUp.labels.confirmPassword")}
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />

                <View
                  style={[
                    styles.buttonContainer,
                    { justifyContent: "center", alignItems: "center" }
                  ]}
                >
                  <Button
                    style={styles.loginButton}
                    color="white"
                    text={locale.t("login.connect")}
                    iconRight="chevron-right"
                    iconSize={0.05 * width}
                    iconColor="#90F800"
                  />
                </View>
              </View>
            )}
          </Formik>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              {locale.t("signUp.existingAccount")}
            </Text>
            <Button
              type="text"
              underlined
              color="#F40303"
              text={locale.t("signUp.connect")}
              OnPress={() => router.push("login")}
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
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
  form: {
    flex: 5,
    rowGap: 24,
    backgroundColor: "transparent"
  },
  formContainer: {
    flex: 3,
    paddingVertical: 56,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingHorizontal: 0.13 * width,
    backgroundColor: Colors.light.background
  },
  title: {
    fontFamily: "SoraBold",
    color: Colors.light.background,
    fontSize: 24
  },
  textInput: {
    fontFamily: "SoraLight",
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    borderBottomWidth: 1,
    fontSize: 18,
    height: 46,
    flex: 1
  },
  field: {
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "transparent"
  },
  fieldContainer: {
    rowGap: 8
  },
  loginButton: {
    backgroundColor: "#532181",
    width: "100%"
  },
  signUpContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "flex-end",
    columnGap: 16
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "SoraMedium",
    color: "#000"
  }
})
