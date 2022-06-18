import axios from 'axios'
import { toast } from 'react-toastify'

// 区分环境
const instance = axios.create({
  // baseURL: 'https://mockend.com/ivanberry/reSizely',
  baseURL: '/api',
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('config: ', config)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
// response Schema
// {
//   // `data` is the response that was provided by the server
//   data: {},

//   // `status` is the HTTP status code from the server response
//   status: 200,

//   // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',

//   // `headers` the HTTP headers that the server responded with
//   // All header names are lowercase and can be accessed using the bracket notation.
//   // Example: `response.headers['content-type']`
//   headers: {},

//   // `config` is the config that was provided to `axios` for the request
//   config: {},

//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance in the browser
//   request: {}
// }
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { status } = response
    if (status === 200) {
      return Promise.resolve(response?.data)
    } else {
      toast.error(response?.data?.msg || 'Error', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error?.msg || 'Error', {
      position: toast.POSITION.TOP_CENTER,
    })
  }
)

export { instance as default }
