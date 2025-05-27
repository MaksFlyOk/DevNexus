import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupTagsData } from '../mocks-data'

export const deleteTagGroup = http.delete<
  PathParams,
  null,
  object | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/tags/:tag_code/`,
  async ({ params }) => {
    const { group_id, tag_code } = params

    const currentGroupIndex = groupTagsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupTagsData[currentGroupIndex]) {
      const currentTagIndex = groupTagsData[currentGroupIndex].tags.findIndex(
        tag => tag.code === tag_code
      )

      if (currentTagIndex !== -1) {
        groupTagsData[currentGroupIndex].tags.splice(currentTagIndex, 1)

        return HttpResponse.json({}, { status: 200 })
      }
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
