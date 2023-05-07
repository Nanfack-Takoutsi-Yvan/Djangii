/* eslint-disable react/jsx-no-bind */
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  ScrollView
} from "react-native"

import { Formik } from "formik"
import { useContext, useState } from "react"
import { View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { useRouter } from "expo-router"
import { Text, TextInput, Button, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"
import PasswordIcon from "@components/ui/PasswordIcon"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false)
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()
  const router = useRouter()

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/images/screens/background.png")}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text variant="headlineMedium" style={{}}>
          {locale.t("login.connection")}
        </Text>
        <Icon source="login" size={32} color="#90F800" />
      </View>
      <View style={styles.formContainer}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Formik
            initialValues={{ userName: "", password: "" }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <View style={{ backgroundColor: "transparent" }}>
                  <Text variant="titleLarge">
                    {locale.t("login.labels.userName")}
                  </Text>
                  <TextInput
                    placeholder={locale.t("login.labels.userName")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="name-phone-pad"
                    value={values.userName}
                    onBlur={handleBlur("userName")}
                    onChangeText={handleChange("userName")}
                    style={{ backgroundColor: "transparent" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <View style={{ backgroundColor: "transparent" }}>
                  <Text variant="titleLarge">
                    {locale.t("login.labels.password")}
                  </Text>
                  <TextInput
                    placeholder={locale.t("login.labels.password")}
                    placeholderTextColor="rgba(0, 0, 0, 0.20)"
                    keyboardType="visible-password"
                    secureTextEntry={isPasswordHidden}
                    right={
                      <PasswordIcon
                        showEye={isPasswordHidden}
                        toggleEye={setIsPasswordHidden}
                      />
                    }
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    style={{ backgroundColor: "transparent" }}
                    contentStyle={{ paddingLeft: 0 }}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    mode="text"
                    textColor="#F40303"
                    compact
                    onPress={() => console.log("pressed")}
                    labelStyle={{ textDecorationLine: "underline" }}
                  >
                    {locale.t("login.passwordForgotten")}
                  </Button>
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
                    {locale.t("login.connect")}
                  </Button>
                </View>
              </View>
            )}
          </Formik>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>{locale.t("login.noAccount")}</Text>
            <Button
              mode="text"
              textColor="#F40303"
              compact
              onPress={() => router.push("signUp")}
            >
              {locale.t("login.signUp")}
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
    flex: 4,
    rowGap: 24,
    backgroundColor: "transparent"
  },
  formContainer: {
    flex: 3,
    paddingVertical: 56,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingHorizontal: 0.13 * width
  },
  title: {
    fontFamily: "SoraBold",
    fontSize: 24
  },
  textInput: {
    fontFamily: "SoraLight",
    borderBottomColor: "rgba(0, 0, 0, 0.50)",
    borderBottomWidth: 1,
    fontSize: 18,
    height: 46,
    flex: 1
  },
  labels: {
    fontFamily: "SoraSemibold",
    fontSize: 20,
    marginBottom: 8,
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
  loginButton: {
    width: "100%"
  },
  signUpContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    columnGap: 4
  },
  signUpText: {
    fontSize: 16,
    fontFamily: "SoraMedium",
    color: "#000"
  }
})
