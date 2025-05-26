import { GroupType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import {
  currentUserData,
  groupCardTagsData,
  groupsData,
  groupTagsData
} from '../mocks-data'

export const postAddGroupHandler = http.post<
  PathParams,
  { name: string },
  { name: string },
  Path
>(`${import.meta.env.VITE_APP_API_URL}v1/groups/`, async ({ request }) => {
  const newGroupRequest = await request.json()

  const newGroupUUID = crypto.randomUUID()

  const newGroupIntoGroupsData: GroupType = {
    id: groupsData.length + 1,
    group_uuid: newGroupUUID,
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
    group_uuid: newGroupUUID,
    name: newGroupRequest.name,
    icon: null,
    cards: []
  }

  groupsData.push(newGroupIntoGroupsData)
  currentUserData.groups.push(newGroupIntoUserData)
  groupCardTagsData.push({ group_uuid: newGroupUUID, tags: [] })
  groupTagsData.push({ group_uuid: newGroupUUID, tags: [] })

  return HttpResponse.json({ name: newGroupRequest.name })
})
