import { FC, useState } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { Card, ProgressBar, Text, useTheme } from "react-native-paper"
import { ReportCardProps } from "./types"
import Chart from "../Chart"

const ReportCard: FC<ReportCardProps> = ({
  name,
  acronym,
  selected,
  onPress,
  curveData
}) => {
  const [cardHeight, setCardHeight] = useState<number>()

  const { colors } = useTheme()
  const { width } = useWindowDimensions()

  const cardWidth = width * 0.6

  return (
    <Card
      onPress={onPress}
      mode="contained"
      style={[
        styles.card,
        {
          width: cardWidth,
          borderColor: selected ? colors.primary : undefined,
          borderWidth: selected ? 1 : undefined
        }
      ]}
      onLayout={e => {
        const { height } = e.nativeEvent.layout
        setCardHeight(height)
      }}
    >
      <Card.Content>
        <View>
          <Text variant="bodySmall" numberOfLines={1}>
            {acronym}
          </Text>
          <Text variant="displaySmall" numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View>
          {curveData && cardHeight ? (
            <Chart
              data={curveData}
              width={cardWidth * 0.79}
              height={cardHeight * 0.5}
              labels={false}
              points={false}
              background={false}
            />
          ) : null}
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10
  }
})

export default ReportCard
