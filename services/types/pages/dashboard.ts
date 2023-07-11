interface IDashboardData {
  associationCreatedTotal: number
  associationManagedTotal: number
  contributionCurve: Curve[]
  contributionVolume: number
  memberAssociationCurve: Curve[]
  memberAssociationTotal: number
  penaltyUnpaidTotal: number
  tontineCurve: Curve[]
  tontineRoundCurve: Curve[]
  tontineRoundOpenedTotal: number
  tontineSessionProgrammedTotal: number
  tontineTotal: number
}

interface IDashboardController {
  getCurveData: (id: string, token: string) => Promise<IDashboardData>
}

type Curve = {
  month: string
  total: number
}
