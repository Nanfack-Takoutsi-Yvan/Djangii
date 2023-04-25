/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar
} from "react-native"

import { Formik } from "formik"
import { useContext } from "react"
import Colors from "@constants/Colors"
import { Text, View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { SafeAreaView } from "react-native-safe-area-context"
import { Icon } from "@react-native-material/core"
import Field from "@components/ui/Field"
import Button from "@components/ui/Button"
import { useRouter } from "expo-router"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)
  const router = useRouter()

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <View
            style={{
              columnGap: 16,
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "transparent"
            }}
          >
            <Text style={styles.title}>{locale.t("login.connection")}</Text>
            <Icon name="login" size={0.07 * width} color="#90F800" />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ userName: "", password: "" }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <Field
                  iconColor="#532181"
                  icon="account-outline"
                  iconSize={0.07 * width}
                  value={values.userName}
                  labelStyle={styles.labels}
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("userName")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("userName")}
                  label={locale.t("login.labels.userName")}
                  placeholder={locale.t("login.labels.userName")}
                  placeholderTextColor="rgba(0, 0, 0, 20)"
                />

                <Field
                  iconColor="#532181"
                  secureTextEntry
                  iconSize={0.07 * width}
                  value={values.password}
                  labelStyle={styles.labels}
                  icon="form-textbox-password"
                  inputStyle={styles.textInput}
                  onBlur={handleBlur("password")}
                  wrapperStyle={styles.fieldContainer}
                  onChangeText={handleChange("password")}
                  label={locale.t("login.labels.password")}
                  placeholder={locale.t("login.labels.password")}
                  placeholderTextColor="rgba(0, 0, 0, 20)"
                />

                <View style={styles.buttonContainer}>
                  <Button
                    type="text"
                    underlined
                    color="#F40303"
                    text={locale.t("login.passwordForgotten")}
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
            <Text style={styles.signUpText}>{locale.t("login.noAccount")}</Text>
            <Button
              type="text"
              underlined
              color="#F40303"
              text={locale.t("login.signUp")}
              OnPress={() => router.push("signUp")}
            />
          </View>
        </View>
      </SafeAreaView>
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
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 40,
    columnGap: 16
  },
  form: {
    flex: 4,
    rowGap: 24,
    backgroundColor: "transparent"
  },
  formContainer: {
    flex: 5,
    paddingTop: 56,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingHorizontal: 0.13 * width,
    backgroundColor: Colors.light.background
  },
  title: {
    fontFamily: "SoraBold",
    color: Colors.light.background,
    fontSize: 0.065 * width
  },
  textInput: {
    fontFamily: "SoraLight",
    borderBottomColor: "rgba(0, 0, 0,50)",
    borderBottomWidth: 1,
    fontSize: 0.044 * width,
    flex: 1
  },
  labels: {
    fontFamily: "SoraSemibold",
    fontSize: 0.047 * width,
    marginBottom: 12,
    color: "#000"
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
    alignItems: "baseline",
    columnGap: 16
  },
  signUpText: {
    fontSize: 0.035 * Dimensions.get("window").width,
    fontFamily: "SoraMedium",
    color: "#000"
  }
})
