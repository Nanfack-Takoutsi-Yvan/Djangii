import { View, useWindowDimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { useTheme } from "react-native-paper/src/core/theming"

function Chart() {
  const { colors } = useTheme()
  const { width, height } = useWindowDimensions()
  const graphHeight = height * 0.3

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
      <LineChart
        // withHorizontalLabels={false}
        // withInnerLines={false}
        // withHorizontalLines={false}
        withVerticalLines={false}
        // withOuterLines={false}
        data={{
          labels: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ].map(el => `${el.toPrecision(2)}`),
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            },
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={width} // from react-native
        height={graphHeight}
        chartConfig={{
          fillShadowGradientFrom: "#ffffff",
          fillShadowGradientTo: "#ffffff00",
          fillShadowGradientOpacity: 0.5,
          backgroundGradientFrom: "#532181",
          backgroundGradientTo: "#532181",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${1})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#fff",
            fill: colors.secondary
          },
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
