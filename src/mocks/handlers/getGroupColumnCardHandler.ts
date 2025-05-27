import { http, HttpResponse } from 'msw'
import { groupsData } from '../mocks-data'

export const getGroupColumnCardHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:id/cards/:code`,
  ({ params }) => {
    const { id, code } = params

    return HttpResponse.json(
      groupsData
        .find(group => group.group_uuid === id)
        ?.board.columns.find(column =>
          column.tasks.find(task => task.code === code)
        )
        ?.tasks.find(task => task.code === code),
      { status: 200 }
    )
  }
)
