/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useTranslation } from "react-i18next"

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn()
}))

const tSpy = jest.fn(str => str)
const useTranslationSpy: any = useTranslation

useTranslationSpy.mockReturnValue({
  t: tSpy,
  i18n: {
    changeLanguage: () => new Promise(() => {})
  }
})
