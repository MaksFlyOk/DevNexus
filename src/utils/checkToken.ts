import Cookies from 'js-cookie'

export const checkToken = () => {
  if (
    localStorage.getItem(import.meta.env.VITE_APP_TOKEN) &&
    Cookies.get(import.meta.env.VITE_APP_TOKEN)
  )
    return true

  return false
}
