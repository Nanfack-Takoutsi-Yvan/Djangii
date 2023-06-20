import { FC, useContext, useState } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { Card, Text, useTheme } from "react-native-paper"

import AppStateContext from "@services/context/context"
import { ReportCardProps } from "./types"
import Chart from "../Chart"

const ReportCard: FC<ReportCardProps> = ({
  name,
  acronym,
  onPress,
  selected,
  currency,
  curveData
}) => {
  const [cardHeight, setCardHeight] = useState<number>()

  const { colors } = useTheme()
  const { width } = useWindowDimensions()
  const { locale } = useContext(AppStateContext)

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
            <>
              <Chart
                data={curveData}
                width={cardWidth * 0.79}
                height={cardHeight * 0.5}
                points={false}
                background={false}
              />
              <View style={[styles.legend, { top: cardHeight * 0.5 }]}>
                <View>
                  <Text>{locale.t("dashboard.legends.contributionCurve")}</Text>
                </View>
                <View>
                  <Text style={{ color: colors.primary }} variant="titleMedium">
                    {currency}
                  </Text>
                </View>
              </View>
            </>
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
  },
  legend: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "baseline"
  }
})

export default ReportCard
