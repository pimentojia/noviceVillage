import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'

import request from './request'

const mock = new MockAdapter(request, { delayResponse: 500 })

mock
  .onGet('/analysis/count').reply(200, Mock.mock({
    'new|0-10': 1,
    'pending|0-10': 1,
    'overdue|0-10': 1,
    'resolution|0-100': 1
  }))
  .onGet('/analysis/tendency').reply(200, Mock.mock({
    'total_count|30': ['@natural(0, 50)'],
    'time|30': ['@date'],
    'finish_count|30': ['@natural(0, 5)'],
    'overdue_count|30': ['@natural(0, 20)']
  }))
  .onGet('/analysis/priority').reply(200, Mock.mock([{
    'urgent_level|1': ['低', '中', '高'],
    'num|1-5': 1,
    'value|1': '3'
  }]))
  .onGet('/analysis/distribution').reply(200, Mock.mock({
    'resolution_rate|30': ['@natural(0, 12)'],
    'today_finish_count|30': ['@natural(0, 3'],
    'time|30': ['@date'],
    'today_create_count|30': ['@natural(0, 12)'],
    'overdue_count|30': ['@natural(0, 25)']
  }))
  .onGet('/analysis/statistics').reply(200, Mock.mock({
    'list|2': [{
      'id': '@id',
      'name|+1': [0, 1],
      'count|1-5': 1,
      'using|1': true
    }]
  }).list)
  .onGet('/table').reply(200, Mock.mock({
    'list|10': [{
      'id': '@id',
      'name': /Log_\d{10}/,
      'user': {
        'realname': '@name',
        'userBelongType|1-4': 1
      },
      'execType|0-2': 1,
      'startTime': '@datetime',
      'endTime': '@datetime',
      'execDuration|1000-35000': 1,
      'status|0-2': 1
    }]
  }).list)
  .onPost('/form').reply(200)

  .onGet('/task/count').reply(200, Mock.mock({
    'project|0-10': 1,
    'daily|0-10': 1,
    'question|0-10': 1,
    'history|0-100': 1
  }))

  .onGet('/task/list').reply(200, Mock.mock({
    'list|11': [{
      'id': '@id',
      'name': /Task_\d{4}/,
      'user': {
        'realname': '@name',
        'userBelongType|1': 1
      },
      'issueTime': '@datetime',
      'startTime': '@datetime',
      'endTime': '@datetime',
      'period|0-24': 1,
      'execDuration|1000-35000': 1,
      'status|0-1': 1
    }]
  }).list)
  // .restore()

export default mock
