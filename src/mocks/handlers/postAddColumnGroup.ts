import { AccentColorsType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

export const postAddColumnGroup = http.post<
  PathParams,
  { name: string; color: AccentColorsType },
  | { id: number; name: string; color: AccentColorsType }
  | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/group/:id/column/create/`,
  async ({ request, params }) => {
    const { id } = params

    const newColumnGroupRequest = await request.json()

    const currentGroupIndex = groupsData.findIndex(
      group => group.group_uuid === id
    )

    if (groupsData[currentGroupIndex]) {
      const newColumnGroupData = {
        ...newColumnGroupRequest,
        code: groupsData[currentGroupIndex]?.board.columns.length + 1,
        tasks: []
      }

      groupsData[currentGroupIndex]?.board.columns.push(newColumnGroupData)

      return HttpResponse.json({
        id: newColumnGroupData.code,
        name: newColumnGroupData.name,
        color: newColumnGroupData.color
      })
    }

    return HttpResponse.json({ error: 'Что то пошло не так' })
  }
)
