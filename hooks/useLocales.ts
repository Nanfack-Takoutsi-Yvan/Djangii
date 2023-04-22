/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from "react"
import locales from "@locales/index"
import { I18n } from "i18n-js"

const useLocales = (deviceLocale: string) => {
  const [locale, setLocale] = useState<string>(deviceLocale)
  const i18n = new I18n(locales)
  i18n.enableFallback = true
  i18n.locale = locale

  useEffect(() => {
    setLocale(deviceLocale)
  }, [deviceLocale])

  return { i18n, setLocale }
}

export default useLocales
