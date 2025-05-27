import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

export const postCurrentUserDeleteTags = http.delete<
  PathParams,
  null,
  | object
  | { error: 'Не получилось обновить тэги' }
  | { error: 'Пользователь не состоит в группе' }
  | { error: 'Такой группы не существует' },
  Path
>(
  `${
    import.meta.env.VITE_APP_API_URL
  }v1/groups/:group_id/usertags/delete/:username/:tag_code/`,
  async ({ params }) => {
    const { group_id, username, tag_code } = params

    const groupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupsData[groupIndex]) {
      const memberIndex = groupsData[groupIndex].members.findIndex(
        member => member.username === username
      )

      if (memberIndex !== -1) {
        const member = groupsData[groupIndex].members[memberIndex]

        if (member?.tags) {
          const currentTagIndex = member?.tags.findIndex(
            tag => tag.code === tag_code
          )

          if (currentTagIndex !== -1) {
            groupsData[groupIndex].members[memberIndex]?.tags.splice(
              currentTagIndex,
              1
            )

            return HttpResponse.json({}, { status: 200 })
          }
        }

        return HttpResponse.json(
          { error: 'Не получилось обновить тэги' },
          { status: 400 }
        )
      }

      return HttpResponse.json(
        { error: 'Пользователь не состоит в группе' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { error: 'Такой группы не существует' },
      { status: 400 }
    )
  }
)
