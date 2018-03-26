import request from '~/utils/request'

export function getAnalysisCount () {
  return request.get('/analysis/count')
}

export function getAnalysisTendency (params) {
  return request.get('/analysis/tendency', { params })
}

export function getAnalysisPriority (params) {
  return request.get('/analysis/priority', { params })
}

export function getAnalysisDistribution (params) {
  return request.get('/analysis/distribution', { params })
}

export function getAnalysisStatistics (params) {
  return request.get('/analysis/statistics', { params })
}

export function getTable (params) {
  return request.get('/table')
}

export function postForm (data) {
  return request.post('/form', { data })
}

export function getTaskCount (params) {
  return request.get('/task/count', { params })
}

export function getTaskList (params) {
  return request.get('/task/list', { params })
}

export function setTaskStatus (data) {
  return request.post('/task/setTaskStatus', { data })
}
