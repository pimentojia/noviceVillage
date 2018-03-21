import { observable, action } from 'mobx'

import { getCookie } from '~/utils/cookies'

class Global {
  @observable
  language = getCookie('language') || 'zh_CN'

  @observable
  theme = 'blue'

  themes = ['white', 'dark', 'blue']

  @action
  changeLanguage () {
    this.language = this.language === 'zh_CN' ? 'en_US' : 'zh_CN'
  }

  @action
  changeTheme () {
    this.theme = this.themes.shift()

    this.themes.push(this.theme)
  }
}

export default Global
