import { http, HttpResponse } from 'msw'

export const postAuthUserHandler = http.post(
  `${import.meta.env.VITE_APP_API_URL}token/`,
  () => {
    return HttpResponse.json(
      {
        access: 'access',
        refresh: 'refresh'
      },
      {
        status: 200
      }
    )
  }
)
