import { FC, useContext } from "react"
import { StyleSheet, View } from "react-native"
import { Text, TextInput, useTheme } from "react-native-paper"
import Icon from "react-native-paper/lib/typescript/src/components/Icon"

import AppStateContext from "@services/context/context"
import { TextFieldProps } from "./type"

const TextField: FC<TextFieldProps> = ({
  icon,
  touched,
  error,
  errorLabel,
  ...rest
}) => {
  const { locale } = useContext(AppStateContext)
  const { colors } = useTheme()

  return (
    <View style={styles.field}>
      <Icon
        source={icon}
        color={error && touched ? colors.error : colors.primary}
        size={32}
      />
      <View style={styles.screen}>
        <View>
          <TextInput
            {...rest}
            placeholderTextColor="rgba(0, 0, 0, 0.20)"
            style={styles.textInput}
            dense
            underlineColor="rgba(0,0,0,0.5)"
            error={!!error && touched}
          />
        </View>
        {error && touched && (
          <View>
            <Text
              style={{
                color: colors.error
              }}
            >
              {locale.t(errorLabel)}
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24
  },
  fieldsContainer: {
    backgroundColor: "transparent",
    rowGap: 16,
    marginTop: 12
  },
  field: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "baseline"
  },
  textInput: {
    paddingHorizontal: 0
  }
})

export default TextField
