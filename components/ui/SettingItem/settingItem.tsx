import { FC } from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Avatar, Card, Text } from "react-native-paper"

const SettingItem: FC<SettingItemProps> = ({
  icon,
  title,
  description,
  onPress
}) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Card mode="contained">
      <Card.Content style={styles.content}>
        <View>
          <Avatar.Icon icon={icon} size={54} />
        </View>
        <View style={styles.description}>
          <Text variant="labelMedium">{title}</Text>
          <Text lineBreakMode="tail" numberOfLines={1}>
            {description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row"
  },
  content: {
    flexDirection: "row",
    columnGap: 12,
    alignItems: "center"
  },
  description: {
    justifyContent: "center",
    rowGap: 4,
    width: "75%"
  }
})

export default SettingItem
