import { observable, action, runInAction } from 'mobx'

import {
  getTaskList,
  getTaskCount,
  setTaskStatus
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

  @observable
  status = 0

  @action
  async

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
