/* eslint-disable react/no-array-index-key */
import { FC, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { Card, Text } from "react-native-paper"
import { getFullName } from "@services/utils/functions/format"
import AppAvatar from "../AppAvatar"
import SocialProfile from "../SocialProfile"

const WhoIsWho: FC<CustomPagesProps> = ({ data }) => {
  const [users, setUsers] = useState<IUserAssociation[]>([])

  useEffect(() => {
    if (data) {
      setUsers(data.filter(user => user.type === "ACTIVE"))
    }
  }, [data])

  return (
    <View style={styles.screen}>
      <FlatList
        data={users}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        scrollEnabled
        renderItem={({ item }) => (
          <Card
            mode="elevated"
            style={styles.card}
            contentStyle={styles.cardContent}
          >
            <Card.Content>
              <View>
                {item?.userInfos && (
                  <AppAvatar user={item.userInfos} size={120} />
                )}
              </View>
            </Card.Content>
            <Card.Content>
              <View style={styles.description}>
                <Text variant="bodyLarge">
                  {getFullName(item?.firstName, item?.lastName)}
                </Text>
                <Text variant="bodySmall">
                  {item?.userInfos?.socialProfil.activityAreas
                    .map(area => area.description)
                    .join(",")}
                </Text>
              </View>
              <View style={styles.socialNetworks}>
                {item?.userInfos?.socialProfil?.socialNetworkLinks.map(
                  (network, index) => (
                    <SocialProfile
                      key={`${network.url}-${index}`}
                      url={network.url}
                      type={network.type}
                    />
                  )
                )}
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
    flex: 1
  },
  list: {
    flex: 1
  },
  listContent: {
    rowGap: 12,
    paddingBottom: 8
  },
  card: {
    backgroundColor: "#fff",
    padding: 24
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  socialNetworks: {
    flexDirection: "row",
    columnGap: 6
  },
  description: {
    rowGap: 4,
    marginBottom: 12
  }
})

export default WhoIsWho
