import { AccentColorsType, TagType, TaskType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

const formatWithLeadingZeros = (num: number, length: number = 6): string => {
  const numStr = num.toString()

  const zerosNeeded = Math.max(0, length - numStr.length)

  return '0'.repeat(zerosNeeded) + numStr
}

export const postAddCardColumnGroup = http.post<
  PathParams,
  Omit<TaskType, 'code'> & { tags: Omit<TagType, 'code'>[] },
  | (TaskType & { column_color: AccentColorsType })
  | { error: 'Такой колонки не существует' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/cards/create/`,
  async ({ request, params }) => {
    const { group_id } = params

    const newCardColumnGroupRequest = await request.json()

    const currentGroupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )
    const currentColumnIndex = groupsData[currentGroupIndex]
      ? groupsData[currentGroupIndex].board.columns.findIndex(
          currentColumn =>
            newCardColumnGroupRequest.column === currentColumn.name
        )
      : undefined

    if (
      currentColumnIndex !== undefined &&
      currentColumnIndex !== -1 &&
      groupsData[currentGroupIndex]?.board.columns[currentColumnIndex]
    ) {
      let cardNumberCode = 0

      groupsData[currentGroupIndex]?.board.columns.forEach(column =>
        column.tasks.forEach(() => {
          cardNumberCode++
        })
      )

      const newCardData: TaskType & { column_color: AccentColorsType } = {
        assignee: newCardColumnGroupRequest.assignee,
        column: newCardColumnGroupRequest.column,
        column_color:
          groupsData[currentGroupIndex]?.board.columns[currentColumnIndex]
            .color,
        description: newCardColumnGroupRequest.description,
        end_date: newCardColumnGroupRequest.end_date,
        start_date: newCardColumnGroupRequest.start_date,
        title: newCardColumnGroupRequest.title,
        tags: newCardColumnGroupRequest.tags,
        code: formatWithLeadingZeros(cardNumberCode + 1)
      }

      groupsData[currentGroupIndex]?.board.columns[
        currentColumnIndex
      ]?.tasks.push(newCardData)

      return HttpResponse.json(newCardData, { status: 200 })
    }

    return HttpResponse.json(
      { error: 'Такой колонки не существует' },
      { status: 400 }
    )
  }
)
