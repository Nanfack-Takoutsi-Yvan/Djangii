import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart"

export type ChartProps = {
  data: LineChartData
  width: number
  height: number
  labels?: boolean
  points?: boolean
  background?: boolean
}
