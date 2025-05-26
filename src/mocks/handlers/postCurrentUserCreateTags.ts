import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData, groupTagsData } from '../mocks-data'

export const postCurrentUserCreateTagsHandler = http.post<
  PathParams,
  {
    username: string
    tag_code: string
  },
  object | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/usertags/create`,
  async ({ request, params }) => {
    const { group_id } = params

    const requestData = await request.json()

    const groupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupsData[groupIndex]) {
      const memberIndex = groupsData[groupIndex].members.findIndex(
        member => member.username === requestData.username
      )

      if (memberIndex !== -1) {
        const member = groupsData[groupIndex]?.members[memberIndex]

        if (
          groupsData[groupIndex].members[memberIndex] &&
          member?.tags &&
          member?.tags.length < 2 &&
          member?.tags.findIndex(tag => tag.code === requestData.tag_code) ===
            -1
        ) {
          const tag = groupTagsData
            .find(group => group.group_uuid === group_id)
            ?.tags.find(tag => tag.code === requestData.tag_code)

          console.log('tag', tag)
          if (tag) {
            groupsData[groupIndex].members[memberIndex].tags.push(tag)

            return HttpResponse.json({})
          }
        }
      }
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
