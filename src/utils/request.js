import axios from 'axios'
import { notification } from '@uyun/uyd'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  notification.error({
    message: `请求错误 ${response.status}: ${response.config.url}`,
    description: response.statusText
  })

  const error = new Error(response.statusText)

  error.response = response

  throw error
}
function catchError (error) {
  if (error.code) {
    notification.error({
      message: error.name,
      description: error.message
    })
  }
  if ('stack' in error && 'message' in error) {
    notification.error({
      description: error.message
    })
  }
  return error
}

const request = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
})

request.interceptors.response.use(checkStatus, catchError)
request.interceptors.response.use(res => res.data)

export default request
