import AppStateContext from "@services/context/context"
import { Formik, FormikHelpers, FormikValues } from "formik"
import { FC, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { Button, Text, useTheme } from "react-native-paper"
import Icon from "react-native-paper/src/components/Icon"

const CreateAssociation: FC = () => {
  const { colors } = useTheme()
  const { locale } = useContext(AppStateContext)

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text variant="titleLarge">
            {locale.t(`pages.newAssociationPage`)}
          </Text>
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
        <Formik initialValues={{}} onSubmit={console.log}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <View>
              <Text>Hello world</Text>
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
  }
})

export default CreateAssociation
