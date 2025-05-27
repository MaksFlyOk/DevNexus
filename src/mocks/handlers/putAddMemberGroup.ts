import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

export const putAddMemberGroup = http.put<
  PathParams,
  { username: string },
  { username: string } | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/add_members/`,
  async ({ request, params }) => {
    const { group_id } = params

    const newGroupMemberRequest = await request.json()

    const currentGroupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupsData[currentGroupIndex]) {
      groupsData[currentGroupIndex].members.push({
        username: newGroupMemberRequest.username,
        description: `Я ${newGroupMemberRequest.username}, меня здесь заперли, помогите`,
        email: `${newGroupMemberRequest.username}@devnexus.com`,
        tags: []
      })

      return HttpResponse.json(
        { username: newGroupMemberRequest.username },
        { status: 200 }
      )
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
