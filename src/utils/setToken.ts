import { TokensType } from '@types'
import Cookies from 'js-cookie'

export const setToken = (data: TokensType) => {
  if (data) {
    localStorage.setItem(import.meta.env.VITE_APP_TOKEN, data.access)
    Cookies.set(import.meta.env.VITE_APP_TOKEN, data.refresh)
  }
}
