import { http, HttpResponse } from 'msw'
import { currentUserData } from '../mocks-data'

export const getUserPorfileHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/user/profile/`,
  () => HttpResponse.json(currentUserData)
)
