import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

if (!localStorage.getItem('i18nextLng')) {
  localStorage.setItem('i18nextLng', 'da')
}
i18n

  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'da',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
