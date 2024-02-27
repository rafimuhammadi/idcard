import {FC} from 'react'
import {useLang} from './Metronici18n'
import {IntlProvider} from 'react-intl'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/fa-AF'
import '@formatjs/intl-relativetimeformat/locale-data/ps'

import daMessages from './messages/da.json'
import paMessages from './messages/pa.json'
import enMessages from './messages/en.json'
import {WithChildren} from '../helpers'

const allMessages = {
  da: daMessages,
  pa: paMessages,
  en: enMessages,
}

const I18nProvider: FC<WithChildren> = ({children}) => {
  const locale = useLang()
  const messages = allMessages[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export {I18nProvider}
