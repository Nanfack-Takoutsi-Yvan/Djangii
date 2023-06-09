import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart"

export type ReportCardProps = {
  name: string
  acronym: string
  selected: boolean
  onPress: () => void
  curveData: LineChartData
}
