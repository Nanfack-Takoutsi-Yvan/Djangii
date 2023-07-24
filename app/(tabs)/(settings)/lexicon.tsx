import { FC, useContext } from "react"
import { Text } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import lexicon from "@assets/constants/settings/lexicon"
import AppStateContext from "@services/context/context"

const LexiconSettings: FC = () => {
  const { locale } = useContext(AppStateContext)

  return (
    <ScrollView contentContainerStyle={styles.screen} style={styles.screen}>
      <View style={styles.container}>
        {lexicon.map(lexic => (
          <View key={lexic.title} style={styles.content}>
            <Text variant="labelLarge">
              {locale.t(`settings.${lexic.title}`)}:
            </Text>
            <Text>{locale.t(`settings.${lexic.description}`)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    rowGap: 24
  },
  content: {
    rowGap: 8
  }
})

export default LexiconSettings
