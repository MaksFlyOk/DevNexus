import { TagType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupTagsData } from '../mocks-data'

export const getAllTagGroup = http.get<
  PathParams,
  null,
  TagType[] | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/tags/all/`,
  async ({ params }) => {
    const { group_id } = params

    const currentGroupIndex = groupTagsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupTagsData[currentGroupIndex]?.tags) {
      return HttpResponse.json(groupTagsData[currentGroupIndex].tags, {
        status: 200
      })
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
