import { http, HttpResponse } from 'msw'

export const postRegisterUserHandler = http.post(
  `${import.meta.env.VITE_APP_API_URL}v1/users/registration/`,
  () => {
    return HttpResponse.json(
      {
        id: 0,
        username: 'username',
        email: 'user@example.com'
      },
      {
        status: 201
      }
    )
  }
)
