import { AccentColorsType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

export const postAddColumnGroup = () =>
  http.post<
    PathParams,
    { name: string; color: AccentColorsType },
    { id: number; name: string; color: AccentColorsType },
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

        return new HttpResponse(
          {
            id: newColumnGroupData.code,
            name: newColumnGroupData.name,
            color: newColumnGroupData.color
          },
          {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                import.meta.env.TOKEN
              )}`
            }
          }
        )
      }
    }
  )
