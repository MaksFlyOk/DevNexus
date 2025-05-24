import { clearTokens } from '@utils/clearTokens'
import axios from 'axios'
import Cookies from 'js-cookie'

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem(import.meta.env.TOKEN)
      ? `Bearer ${localStorage.getItem(import.meta.env.TOKEN)}`
      : ''
  }
})

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}token/refresh/`,
      { refresh: Cookies.get(import.meta.env.VITE_APP_TOKEN) },
      {
        withCredentials: true
      }
    )
    return response.data.access
  } catch (error) {
    console.error(error)

    throw new Error(`Failed to refresh access token\n`)
  }
}

$axios.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem(import.meta.env.VITE_APP_TOKEN)

    if (import.meta.env.VITE_APP_IS_MOCKUP === 'false') {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`

        try {
          // Verify refresh token
          await axios.post(
            `${import.meta.env.VITE_APP_API_URL}token/verify/`,
            { token: Cookies.get(import.meta.env.VITE_APP_TOKEN) },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
        } catch (error) {
          console.log(error)

          if (error) {
            clearTokens()
            console.error(error)
          } else {
            const newAccessToken = await refreshAccessToken()

            localStorage.setItem(import.meta.env.VITE_APP_TOKEN, newAccessToken)

            config.headers.Authorization = `Bearer ${newAccessToken}`
          }
        }
      }
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

$axios.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'false') {
      const originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const newAccessToken = await refreshAccessToken()

        localStorage.setItem(import.meta.env.VITE_APP_TOKEN, newAccessToken)

        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`

        return $axios(originalRequest)
      }

      return Promise.reject(error)
    }
  }
)
