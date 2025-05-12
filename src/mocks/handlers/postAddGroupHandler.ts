import { http, HttpResponse, Path, PathParams } from 'msw'
import { currentUserData, groupsData } from '../mocks-data'

export const postAddGroupHandler = http.post<
  PathParams,
  { name: string },
  { name: string },
  Path
>(`${import.meta.env.VITE_APP_API_URL}v1/group`, async ({ request }) => {
  const newGroupRequest = await request.json()

  const newGroupIntoGroupsData = {
    id: groupsData.length + 1,
    group_uuid: `${crypto.randomUUID()}`,
    name: newGroupRequest.name,
    icon: null,
    members: [
      {
        username: 'Грейс',
        email: 'grays@example.com'
      }
    ],
    description: 'Основная группа разработки',
    admin: {
      username: 'Грейс',
      email: 'grays@example.com'
    },
    board: {
      columns: []
    }
  }

  const newGroupIntoUserData = {
    id: groupsData.length + 1,
    group_uuid: `${crypto.randomUUID()}`,
    name: newGroupRequest.name,
    icon: null,
    cards: []
  }

  groupsData.push(newGroupIntoGroupsData)
  currentUserData.groups.push(newGroupIntoUserData)

  return new HttpResponse({ name: newGroupRequest.name })
})
