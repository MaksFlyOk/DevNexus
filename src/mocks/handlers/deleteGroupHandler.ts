import { http, HttpResponse, Path, PathParams } from 'msw'
import { currentUserData, groupsData } from '../mocks-data'

export const deleteGroupHandler = http.delete<PathParams, null, object, Path>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/`,
  async ({ params }) => {
    const { group_id } = params

    const currentGroupIndexGroupsData = groupsData.findIndex(
      group => group.group_uuid === group_id
    )
    const currentGroupIndexUserData = currentUserData.groups.findIndex(
      group => group.group_uuid === group_id
    )

    if (currentGroupIndexUserData !== -1 && currentGroupIndexUserData !== -1) {
      groupsData.splice(currentGroupIndexGroupsData, 1)
      currentUserData.groups.splice(currentGroupIndexUserData, 1)

      return HttpResponse.json({}, { status: 200 })
    }

    return HttpResponse.json(
      { error: 'Не получилось удалить группу' },
      { status: 400 }
    )
  }
)
