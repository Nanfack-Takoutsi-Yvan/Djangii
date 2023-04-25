/* eslint-disable import/no-extraneous-dependencies */
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native"

import { Formik } from "formik"
import { useContext } from "react"
import Colors from "@constants/Colors"
import { Text, View } from "@components/Themed"
import AppStateContext from "@services/context/context"
import { SafeAreaView } from "react-native-safe-area-context"
import { Icon } from "@react-native-material/core"

const { width } = Dimensions.get("window")

export default function TabOneScreen() {
  const { locale } = useContext(AppStateContext)

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
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "transparent",
              columnGap: 16
            }}
          >
            <Text style={styles.title}>{locale.t("login.connection")}</Text>
            <Icon name="login" size={0.07 * width} color="green" />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ userName: "" }}
            onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View style={styles.form}>
                <View style={styles.fieldContainer}>
                  <View
                    style={{ width: "85%", backgroundColor: "transparent" }}
                  >
                    <Text style={styles.labels}>
                      {locale.t("login.labels.userName")}
                    </Text>
                  </View>
                  <View style={styles.field}>
                    <Icon
                      name="account-outline"
                      size={0.05 * width}
                      color="green"
                    />
                    <TextInput
                      placeholder={locale.t("login.labels.userName")}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.userName}
                      style={[styles.textInput, { width: "75%" }]}
                    />
                  </View>
                </View>
              </View>
            )}
          </Formik>
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
    rowGap: 24,
    backgroundColor: "transparent"
  },
  formContainer: {
    flex: 5,
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    paddingHorizontal: 30
  },
  title: {
    fontFamily: "SoraBold",
    color: Colors.light.background,
    fontSize: 0.065 * width
  },
  textInput: {
    fontFamily: "SoraSemibold",
    borderBottomColor: "#0000003A",
    borderBottomWidth: 1,
    fontSize: 0.044 * width
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
  button: {
    backgroundColor: "#8483839C"
  },
  fieldContainer: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center"
  }
})
