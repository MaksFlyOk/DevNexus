import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupCardTagsData } from '../mocks-data'

export const deleteCardTagGroup = http.delete<
  PathParams,
  null,
  object | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/cardtags/:tag_code/`,
  async ({ params }) => {
    const { group_id, tag_code } = params

    const currentGroupIndex = groupCardTagsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupCardTagsData[currentGroupIndex]) {
      const currentCardTagIndex = groupCardTagsData[
        currentGroupIndex
      ].tags.findIndex(tag => tag.code === tag_code)

      if (currentCardTagIndex !== -1) {
        groupCardTagsData[currentGroupIndex].tags.splice(currentCardTagIndex, 1)

        return HttpResponse.json({})
      }
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
