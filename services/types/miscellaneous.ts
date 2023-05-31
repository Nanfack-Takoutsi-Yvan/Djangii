export enum OTP_CANAL {
  EMAIL = "EMAIL",
  SMS = "SMS"
}

export type NavigationDrawerItems = {
  [key: string]: {
    name: string
    icon: string
    subItems?: string[]
  }
}
