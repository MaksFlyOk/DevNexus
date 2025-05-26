import { GroupType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

const findTaskIndexesSafe = (
  groupData: GroupType,
  taskCode: string
): { columnIndex: number; taskIndex: number } | null => {
  if (!groupData?.board?.columns) return null

  for (
    let columnIndex = 0;
    columnIndex < groupData.board.columns.length;
    columnIndex++
  ) {
    const tasks = groupData.board.columns[columnIndex]?.tasks || []

    const taskIndex = tasks.findIndex(task => task.code === taskCode)
    if (taskIndex !== -1) {
      return { columnIndex, taskIndex }
    }
  }

  return null
}

export const deleteCardColumnGroup = http.delete<
  PathParams,
  null,
  object | { error: 'Что то пошло не так' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/cards/:card_code/`,
  async ({ params }) => {
    const { group_id, card_code } = params

    const currentGroupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupsData[currentGroupIndex] && card_code) {
      const currentCardAndColumnIndex = findTaskIndexesSafe(
        groupsData[currentGroupIndex],
        card_code as string
      )

      if (currentCardAndColumnIndex !== null) {
        console.log(
          'del',
          groupsData[currentGroupIndex].board.columns[
            currentCardAndColumnIndex.columnIndex
          ]?.tasks
        )

        groupsData[currentGroupIndex].board.columns[
          currentCardAndColumnIndex.columnIndex
        ]?.tasks.splice(currentCardAndColumnIndex.taskIndex, 1)

        return HttpResponse.json({})
      }
    }

    return HttpResponse.json({ error: 'Что то пошло не так' }, { status: 400 })
  }
)
