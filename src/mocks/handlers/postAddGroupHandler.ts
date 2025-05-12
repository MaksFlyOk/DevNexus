import { GroupType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { currentUserData, groupsData } from '../mocks-data'

export const postAddGroupHandler = http.post<
  PathParams,
  { name: string },
  { name: string },
  Path
>(`${import.meta.env.VITE_APP_API_URL}v1/group`, async ({ request }) => {
  const newGroupRequest = await request.json()

  const newGroupIntoGroupsData: GroupType = {
    id: groupsData.length + 1,
    group_uuid: `${crypto.randomUUID()}`,
    name: newGroupRequest.name,
    icon: null,
    members: [
      {
        username: 'Павел Николаев',
        email: 'p.nikovaev@devnexus.com',
        description: 'Менеджер проектов с опытом работы в различных проектах.',
        tags: []
      }
    ],
    description: 'Основная группа разработки',
    admin: {
      username: 'Павел Николаев',
      email: 'p.nikovaev@devnexus.com',
      description: 'Менеджер проектов с опытом работы в различных проектах.'
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

  return HttpResponse.json({ name: newGroupRequest.name })
})
