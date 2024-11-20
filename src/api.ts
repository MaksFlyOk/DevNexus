import axios from 'axios'
import Cookies from 'js-cookie'

export const $axios = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: Cookies.get(import.meta.env.TOKEN)
      ? `Bearer ${Cookies.get(import.meta.env.TOKEN)}`
      : ''
  }
})

$axios.interceptors.request.use(
  function (config) {
    if (Cookies.get(import.meta.env.TOKEN)) {
      config.headers.Authorization = `Bearer ${Cookies.get(
        import.meta.env.TOKEN
      )}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
