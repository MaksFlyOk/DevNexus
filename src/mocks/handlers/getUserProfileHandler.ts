import { GroupType, TaskType, UserProfileType } from '@types'
import { http, HttpResponse } from 'msw'
import { currentUserData, groupsData } from '../mocks-data'

const getUserCardsFromMultipleGroups = (
  groupsData: GroupType[],
  username: string
): UserProfileType['groups'] => {
  const result: UserProfileType['groups'] = []

  for (const group of groupsData) {
    const cards: TaskType[] = []

    for (const column of group.board.columns) {
      for (const task of column.tasks) {
        if (task.assignee === username) {
          cards.push({
            code: task.code,
            title: task.title,
            column: task.column,
            column_color: task.column_color,
            assignee: task.assignee,
            description: task.description,
            start_date: task.start_date,
            end_date: task.end_date,
            tags: [...task.tags]
          })
        }
      }
    }

    result.push({
      id: group.id,
      group_uuid: group.group_uuid,
      name: group.name,
      icon: group.icon,
      cards
    })
  }

  return result
}

export const getUserProfileHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/users/me/`,
  () => {
    const userCards: UserProfileType['groups'] = getUserCardsFromMultipleGroups(
      groupsData,
      currentUserData.user.username
    )

    return HttpResponse.json(
      {
        user: {
          username: currentUserData.user.username,
          email: currentUserData.user.email,
          description: currentUserData.user.description
        },
        groups: userCards
      },
      { status: 200 }
    )
  }
)
