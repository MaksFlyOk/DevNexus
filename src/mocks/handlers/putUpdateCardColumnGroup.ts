import { AccentColorsType, TagType, TaskType } from '@types'
import { http, HttpResponse, Path, PathParams } from 'msw'
import { groupsData } from '../mocks-data'

export const putUpdateCardColumnGroup = http.put<
  PathParams,
  Omit<TaskType, 'code'> & { tags: Omit<TagType, 'code'>[] },
  | (TaskType & { column_color: AccentColorsType })
  | { error: 'Такой группы не существует' }
  | { error: 'Такой колонки не существует' }
  | { error: 'Такой карточки не существует' },
  Path
>(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:group_id/cards/:card_code/`,
  async ({ request, params }) => {
    const { group_id, card_code } = params

    const updateCardColumnGroupDataRequest = await request.json()

    const currentGroupIndex = groupsData.findIndex(
      group => group.group_uuid === group_id
    )

    if (groupsData[currentGroupIndex]) {
      const currentColumnIndex = groupsData[
        currentGroupIndex
      ]?.board.columns.findIndex(column =>
        column.tasks.find(task => task.code === card_code)
      )

      if (
        currentColumnIndex !== -1 &&
        groupsData[currentGroupIndex]?.board.columns[currentColumnIndex]
      ) {
        const currentCardIndex = groupsData[currentGroupIndex]?.board.columns[
          currentColumnIndex
        ].tasks.findIndex(task => task.code === card_code)

        const newCardColumnIndex = groupsData[
          currentGroupIndex
        ]?.board.columns.findIndex(
          column => column.name === updateCardColumnGroupDataRequest.column
        )

        console.info(
          'card id',
          currentCardIndex,
          'newcolumn id',
          newCardColumnIndex
        )

        if (
          groupsData[currentGroupIndex]?.board.columns[currentColumnIndex]
            .tasks[currentCardIndex] &&
          groupsData[currentGroupIndex]?.board.columns[newCardColumnIndex]
        ) {
          console.info('next', updateCardColumnGroupDataRequest)

          const newCardData: TaskType & { column_color: AccentColorsType } = {
            assignee: updateCardColumnGroupDataRequest.assignee,
            column: updateCardColumnGroupDataRequest.column,
            column_color:
              groupsData[currentGroupIndex]?.board.columns[newCardColumnIndex]
                ?.color,
            description: updateCardColumnGroupDataRequest.description,
            end_date: new Date(
              new Date(updateCardColumnGroupDataRequest.end_date).getTime() -
                new Date(
                  updateCardColumnGroupDataRequest.end_date
                ).getTimezoneOffset() *
                  60 *
                  1000
            ).toISOString(),
            start_date: new Date(
              new Date(updateCardColumnGroupDataRequest.start_date).getTime() -
                new Date(
                  updateCardColumnGroupDataRequest.start_date
                ).getTimezoneOffset() *
                  60 *
                  1000
            ).toISOString(),
            title: updateCardColumnGroupDataRequest.title,
            tags: updateCardColumnGroupDataRequest.tags,
            code: groupsData[currentGroupIndex]?.board.columns[
              currentColumnIndex
            ].tasks[currentCardIndex].code
          }

          if (
            updateCardColumnGroupDataRequest.column ===
            groupsData[currentGroupIndex]?.board.columns[currentColumnIndex]
              .tasks[currentCardIndex].column
          ) {
            groupsData[currentGroupIndex].board.columns[
              currentColumnIndex
            ].tasks[currentCardIndex] = newCardData
          } else {
            groupsData[currentGroupIndex].board.columns[
              currentColumnIndex
            ].tasks.splice(currentCardIndex, 1)

            groupsData[currentGroupIndex].board.columns[
              newCardColumnIndex
            ].tasks.push(newCardData)
          }

          return HttpResponse.json(newCardData, { status: 200 })
        }

        return HttpResponse.json(
          { error: 'Такой карточки не существует' },
          { status: 400 }
        )
      }

      return HttpResponse.json(
        { error: 'Такой колонки не существует' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      { error: 'Такой группы не существует' },
      { status: 400 }
    )
  }
)
