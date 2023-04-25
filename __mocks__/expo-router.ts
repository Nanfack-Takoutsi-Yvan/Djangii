jest.mock("expo-router", () => {
  const actualNav = jest.requireActual("expo-router")
  return {
    ...actualNav,
    useRouter: () => jest.fn()
  }
})
