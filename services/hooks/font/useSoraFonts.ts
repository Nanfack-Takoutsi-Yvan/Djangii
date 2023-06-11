/* eslint-disable import/extensions */
import {
  useFonts,
  Sora_100Thin,
  Sora_200ExtraLight,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold
} from "@expo-google-fonts/sora"
import FontAwesome from "@expo/vector-icons/FontAwesome"

const useSoraFonts = () => {
  const [loaded, error] = useFonts({
    Sora: Sora_400Regular,
    SoraBold: Sora_700Bold,
    SoraThin: Sora_100Thin,
    SoraLight: Sora_300Light,
    SoraMedium: Sora_500Medium,
    SoraSemibold: Sora_600SemiBold,
    SoraExtraBold: Sora_800ExtraBold,
    SoraExtraLight: Sora_200ExtraLight,
    SpaceMono: require("../../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font
  })

  return [loaded, error]
}

export default useSoraFonts
