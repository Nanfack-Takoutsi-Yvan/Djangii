jest.mock("i18n-js", () => ({
  I18n: () => ({
    t: jest.fn((str: string) => str)
  })
}))
