import { FC } from "react"
import { View } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { useTheme } from "react-native-paper/src/core/theming"
import { ChartProps } from "./type"

const Chart: FC<ChartProps> = ({
  data,
  width,
  height,
  labels = true,
  points = true,
  background = true
}) => {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
      <LineChart
        verticalLabelRotation={40}
        horizontalLabelRotation={-60}
        data={data}
        width={width}
        withVerticalLabels={labels}
        withHorizontalLabels={labels}
        height={height}
        chartConfig={{
          fillShadowGradientFrom: background ? "#ffffff" : "#fff",
          fillShadowGradientTo: background ? "#ffffff00" : "#fff",
          fillShadowGradientOpacity: 0.5,
          backgroundGradientFrom: background ? "#532181" : "#fff",
          backgroundGradientTo: background ? "#532181" : "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
          style: {
            borderRadius: 16
          },
          propsForDots: points
            ? {
                r: "6",
                strokeWidth: "2",
                stroke: "#fff",
                fill: colors.secondary
              }
            : {},
          propsForBackgroundLines: {},
          propsForHorizontalLabels: { strokeWidth: 9 },
          propsForVerticalLabels: {},
          propsForLabels: {}
        }}
        bezier
      />
    </View>
  )
}

export default Chart
