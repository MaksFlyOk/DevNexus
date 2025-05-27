import { TagType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupCardTagsData } from '../mocks-data'

export const getAllCardTagGroup = http.get<
  PathParams,
  null,
  TagType[] | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/cardtags/all/`,
  async ({ params }) => {
    const { group_id } = params

    const currentGroupIndex = groupCardTagsData.findIndex(
      group => group.group_uuid === group_id
    )
    console.log('tgs', groupCardTagsData[currentGroupIndex])

    if (groupCardTagsData[currentGroupIndex]?.tags) {
      return HttpResponse.json(groupCardTagsData[currentGroupIndex].tags, {
        status: 200
      })
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
