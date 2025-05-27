import { UserType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { currentUserData } from '../mocks-data'

export const putUserProfileHandler = http.put<
  PathParams,
  { username: string; email: string; description: string },
  | { username: string; email: string; description: string }
  | { error: 'Что то пошло не так' },
  Path
>(`${import.meta.env.VITE_APP_API_URL}v1/users/me/`, async ({ request }) => {
  const newUserData = await request.json()

  for (const key of Object.keys(currentUserData.user) as Array<
    keyof Omit<UserType, 'tags'>
  >) {
    currentUserData.user[key] = newUserData[key]
  }

  return HttpResponse.json(currentUserData.user)

  return HttpResponse.json({ error: 'Что то пошло не так' })
})
