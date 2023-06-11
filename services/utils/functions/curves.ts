import { DashboardState } from "@services/store/slices/dashboard"
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart"

/* eslint-disable import/prefer-default-export */
export const getCurvedData = (rawData: IDashboardData): LineChartData => {
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

export const getTontineRoundCurve = (
  data: DashboardState["data"],
  id: string
): LineChartData => {
  const curveData: LineChartData = { labels: [], datasets: [{ data: [0] }] }
  const assosData = data.find(datum => datum.associationId === id)

  if (assosData) {
    curveData.labels = assosData.tontineRoundCurve.map(el =>
      el.month.substring(0, 3)
    )
    curveData.datasets.pop()
    curveData.datasets.push({
      data: assosData.tontineRoundCurve.map(el => el.total),
      color: () => "#5E3187",
      withDots: false
    })
  }

  return curveData
}
