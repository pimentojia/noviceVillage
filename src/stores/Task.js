import { observable, action, runInAction } from 'mobx'

import {
  getTaskList,
  getTaskCount
} from '~/services/api'

class Task {
  @observable
  count = {
    project: 0,
    daily: 0,
    question: 0,
    history: 0
  }

  @observable
  data = []

  @action
  async getCount (params) {
    const data = await getTaskCount(params)

    runInAction(() => {
      this.count = data
    })
  }

  @action
  async getList (params) {
    const data = await getTaskList(params)

    runInAction(() => {
      this.data = data
    })
  }
}

export default Task
