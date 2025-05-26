import { CurrentUserProfileType } from '@types'
import { http, HttpResponse } from 'msw'
import { groupsData } from '../mocks-data'

export const getCurrentUserProfileHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/users/:username/:group_id/`,
  ({ params }) => {
    const { username, group_id } = params

    const userData = {
      ...groupsData
        .find(group => group.group_uuid === group_id)
        ?.members.find(member => member.username === username)
    }

    const userCards: CurrentUserProfileType['cards'] = []

    groupsData
      .find(group => group.group_uuid === group_id)
      ?.board.columns.forEach(column => {
        column.tasks.forEach(card => {
          if (card.assignee === username) {
            userCards.push(card)
          }
        })
      })

    if (
      userData.username &&
      userData.description &&
      userData.email &&
      userData.tags
    ) {
      const responseUserData: CurrentUserProfileType = {
        user: {
          username: userData.username,
          email: userData.email,
          description: userData.description
        },
        user_tags: userData.tags.map(tag => {
          return {
            tag_name: tag.name,
            tag_code: tag.code,
            tag_color: tag.color
          }
        }),
        cards: userCards
      }

      return HttpResponse.json(responseUserData)
    }

    return HttpResponse.json({ error: 'что-то пошло не так' }, { status: 400 })
  }
)
