import AppStateContext from "@services/context/context"
import { FC, useContext } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

const AccountSettings: FC = () => {
  const { locale } = useContext(AppStateContext)

  return (
    <View>
      <Text>Hello world</Text>
    </View>
  )
}

export default AccountSettings
