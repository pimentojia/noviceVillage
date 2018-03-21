import { observable, action, runInAction } from 'mobx'

import {
  getTable
} from '~/services/api'

class Table {
  @observable
  data = []

  @action
  async getTable (params) {
    const data = await getTable(params)

    runInAction(() => {
      this.data = data
    })
  }
}

export default Table
