/* eslint-disable react/jsx-no-bind */
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image
} from "react-native"

import { Formik } from "formik"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import Colors from "@constants/Theme/Colors"
import { View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { Text, TextInput, Button } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import { useRouter } from "expo-router"
import PhoneInput from "react-native-phone-input"
import PasswordIcon from "@components/ui/PasswordIcon"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true)
  const [isPasswordConfirmationHidden, setIsPasswordConfirmationHidden] =
    useState<boolean>(true)
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

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
                <View style={styles.fieldRow}>
                  <Icon source="account-outline" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.userName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="name-phone-pad"
                    value={values.userName}
                    onBlur={handleBlur("userName")}
                    onChangeText={handleChange("userName")}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <View style={styles.fieldRow}>
                  <Icon source="account-outline" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.firstName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="name-phone-pad"
                    value={values.firstName}
                    onBlur={handleBlur("firstName")}
                    onChangeText={handleChange("firstName")}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <View style={styles.fieldRow}>
                  <Icon source="account-outline" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.lastName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="name-phone-pad"
                    value={values.lastName}
                    onBlur={handleBlur("lastName")}
                    onChangeText={handleChange("lastName")}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <View style={styles.fieldRow}>
                  <Icon source="at" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.email")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="email-address"
                    value={values.email}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <PhoneInput
                  initialCountry="cm"
                  autoFormat
                  flagStyle={{ borderRadius: 5 }}
                  allowZeroAfterCountryCode={false}
                  confirmText={locale.t("signUp.pickerConfirm")}
                  cancelText={locale.t("signUp.pickerCancel")}
                  offset={18}
                  renderFlag={({ imageSource }) => (
                    <View>
                      <Image
                        source={require("../../assets/images/icons/chevron-down.png")}
                        style={{
                          position: "absolute",
                          zIndex: 2,
                          right: -4,
                          bottom: -2
                        }}
                      />
                      <Image
                        source={imageSource}
                        style={{
                          width: 28,
                          height: 20,
                          borderRadius: 5
                        }}
                      />
                    </View>
                  )}
                  textStyle={{
                    height: 44,
                    fontSize: 16,
                    fontFamily: "SoraMedium",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginBottom: 2
                  }}
                  confirmTextStyle={{
                    fontFamily: "SoraMedium",
                    color: "green"
                  }}
                  cancelTextStyle={{
                    fontFamily: "SoraMedium",
                    color: "red"
                  }}
                />

                <View style={styles.fieldRow}>
                  <Icon source="lock-outline" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.password")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="visible-password"
                    secureTextEntry={isPasswordHidden}
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    contentStyle={{ paddingLeft: 0 }}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                    right={
                      <PasswordIcon
                        showEye={isPasswordHidden}
                        toggleEye={setIsPasswordHidden}
                      />
                    }
                  />
                </View>

                <View style={styles.fieldRow}>
                  <Icon source="lock-outline" size={32} />
                  <TextInput
                    placeholder={locale.t("signUp.labels.confirmPassword")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="visible-password"
                    secureTextEntry={isPasswordHidden}
                    right={
                      <PasswordIcon
                        showEye={isPasswordConfirmationHidden}
                        toggleEye={setIsPasswordConfirmationHidden}
                      />
                    }
                    value={values.confirmPassword}
                    onBlur={handleBlur("confirmPassword")}
                    onChangeText={handleChange("confirmPassword")}
                    contentStyle={{ paddingLeft: 0 }}
                    style={{ backgroundColor: "transparent", width: "100%" }}
                  />
                </View>

                <View
                  style={[
                    styles.buttonContainer,
                    { justifyContent: "center", alignItems: "center" }
                  ]}
                >
                  <Button
                    style={styles.loginButton}
                    mode="contained"
                    buttonColor="#532181"
                    contentStyle={{ flexDirection: "row-reverse" }}
                    icon={() => (
                      <Icon source="chevron-right" size={36} color="#90F800" />
                    )}
                  >
                    {locale.t("signUp.signUp")}
                  </Button>
                </View>
              </View>
            )}
          </Formik>

          <View style={styles.signUpContainer}>
            <Text
              style={[
                styles.signUpText,
                { justifyContent: "center", alignItems: "center" }
              ]}
            >
              {locale.t("signUp.existingAccount")}
            </Text>
            <Button
              mode="text"
              textColor="#F40303"
              contentStyle={{ flexDirection: "row-reverse" }}
              onPress={() => router.push("login")}
            >
              {locale.t("signUp.connect")}
            </Button>
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
    flex: 4,
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
    flex: 1,
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
  fieldRow: {
    flexDirection: "row",
    columnGap: 16,
    alignItems: "center",
    backgroundColor: "transparent"
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
