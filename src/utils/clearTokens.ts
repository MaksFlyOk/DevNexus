import Cookies from 'js-cookie'

export const clearTokens = () => {
  Cookies.remove(import.meta.env.VITE_APP_TOKEN)
  localStorage.removeItem(import.meta.env.VITE_APP_TOKEN)
}
