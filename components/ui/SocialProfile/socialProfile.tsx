import { FC, useCallback } from "react"
import { StyleSheet, View, Linking, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

type Props = {
  type: SocialNetworks
  url: string
}

const SocialProfile: FC<Props> = ({ type, url }) => {
  const socialProfileLogo: Record<SocialNetworks, any> = {
    WHATSAPP: require("@assets/images/icons/whatsapp.png"),
    LINKEDIN: require("@assets/images/icons/linkedin.png"),
    FACEBOOK: require("@assets/images/icons/facebook.png")
  }

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      await Linking.openURL(url)
    }
  }, [url])

  const image = socialProfileLogo[type]

  if (!image) return null

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24
  }
})

export default SocialProfile
