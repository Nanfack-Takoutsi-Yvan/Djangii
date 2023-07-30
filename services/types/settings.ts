interface IDjangiiData {
  code: string
  datation: IHistory
  description: string
  id: string
}

interface IDjangiiDataController {
  getInterestCenter: (token: string) => Promise<IDjangiiData[]>
  getActivityAreas: (token: string) => Promise<IDjangiiData[]>
}
