import { International } from '@uyun/everest-i18n'

import getCookie from './cookies'
import locales from '~/common/locales.json'

const intl = new International({
  language: getCookie('language') || 'zh_CN',
  locale: locales
})

const { i18n } = intl

export {
  i18n,
  i18n as __
}

export default intl
