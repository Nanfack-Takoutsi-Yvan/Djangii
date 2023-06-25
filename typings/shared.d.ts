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
  data: any[]
  error: any
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
  | "chargePayment"
  | "assistance"
  | "assistanceRequest"
  | "warranties"
  | "sparingStates"
  | "advertisement"
  | "audience"
