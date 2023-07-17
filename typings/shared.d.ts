type Dict = {
  [key: string]: any
}

type AuthResponse = {
  data: IUser
  token: string
}

type TabRoute = {
  key: string
  title: string
}

type DashboardSlugParam = {
  slug: DashboardPages
}

type Data = {
  data?: any[]
  error?: any
  loading: boolean
}

type DashboardPages =
  | "association"
  | "pages"
  | "membershipRequest"
  | "members"
  | "identities"
  | "fixedAmount"
  | "variableAmount"
  | "savings"
  | "tontineTurn"
  | "mySubscriptions"
  | "sessions"
  | "pendingLoans"
  | "paidLoans"
  | "canceledLoans"
  | "penaltyType"
  | "sanctionedMembers"
  | "products"
  | "productPayment"
  | "chargeLine"
  | "charges"
  | "chargesType"
  | "assistanceType"
  | "chargePayment"
  | "assistance"
  | "assistanceRequest"
  | "warranties"
  | "sparingStates"
  | "advertisement"
  | "audience"
  | "penalties"
  | "productType"

type PageableData = {
  pageable: Pageable
  sort: Sort
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}

type CustomPages = "whoIsWho"

type CustomPagesProps = {
  tables: tableData[]
  data: IUserAssociation[]
}
