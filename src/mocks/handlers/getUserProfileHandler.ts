import { http, HttpResponse } from 'msw'
import { currentUserData } from '../mocks-data'

export const getUserProfileHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/users/me/`,
  () => {
    return HttpResponse.json(currentUserData)
  }
)
