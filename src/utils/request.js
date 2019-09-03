import axios from 'axios'
import qs from 'qs'

let isDebugging = () => localStorage.debug === 'true'

// create axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // base url
  //withCredentials: true, // wether send cookie when crossing origin
  timeout: 8000
})

// request interceptor
request.interceptors.request.use(
  config => {
    // post方法，用qs转换参数
    if (config.data && !config.noQs) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data
    if (isDebugging()) {
      const config = response.config
      const url = config.baseURL + config.url
      console.log(
        `%c${url}\n%c${JSON.stringify(res)}`,
        'color:blue',
        'color:green'
      )
    }
    if (response.status !== 200) {
      return Promise.reject(new Error('error'))
    } else {
      return res
    }
  },
  error => {
    if (isDebugging()) {
      const config = error.config
      const url = config.baseURL + config.url
      console.log(
        `%c${url}\n%c${error}`,
        'color:blue',
        'color:red'
      )
    }
    return Promise.reject(error)
  }
)

export default request
