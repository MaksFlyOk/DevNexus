import { AccentColorsType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupCardTagsData } from '../mocks-data'

const formatWithLeadingZeros = (num: number, length: number = 6): string => {
  const numStr = num.toString()

  const zerosNeeded = Math.max(0, length - numStr.length)

  return '0'.repeat(zerosNeeded) + numStr
}

export const postCreateCardTagGroup = http.post<
  PathParams,
  { name: string; color: AccentColorsType },
  { name: string; color: AccentColorsType } | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:id/cardtags/create/`,
  async ({ request, params }) => {
    const { id } = params

    const newGroupTagRequest = await request.json()

    const currentGroupIndex = groupCardTagsData.findIndex(
      group => group.group_uuid === id
    )

    if (groupCardTagsData[currentGroupIndex]) {
      groupCardTagsData[currentGroupIndex].tags.push({
        name: newGroupTagRequest.name,
        color: newGroupTagRequest.color,
        code: formatWithLeadingZeros(
          groupCardTagsData[currentGroupIndex].tags.length
        )
      })

      return HttpResponse.json(
        {
          name: newGroupTagRequest.name,
          color: newGroupTagRequest.color
        },
        { status: 200 }
      )
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
