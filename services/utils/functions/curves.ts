import Dashboard from "@services/models/dashboard"
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart"

/* eslint-disable import/prefer-default-export */
export const getCurvedData = (rawData: Dashboard): LineChartData => {
  const data: LineChartData = { labels: [], datasets: [] }

  data.labels = rawData.contributionCurve.map(el => el.month.substring(0, 3))

  data.datasets.push({
    data: rawData.tontineCurve.map(el => el.total),
    color: () => "yellow"
  })

  data.datasets.push({
    data: rawData.memberAssociationCurve.map(el => el.total),
    color: () => "white"
  })

  data.datasets.push({
    data: rawData.tontineRoundCurve.map(el => el.total),
    color: () => "blue"
  })

  data.legend = ["Tontine", "Tontine Round", "Members"]

  return data
}
