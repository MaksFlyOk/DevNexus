import { http, HttpResponse } from 'msw'
import { groupsData } from '../mocks-data'

export const getGroupHandler = http.get(
  `${import.meta.env.VITE_APP_API_URL}v1/groups/:id/`,
  ({ params }) => {
    const { id } = params

    console.log('all', groupsData)
    console.log('id', id)
    console.log(
      'current',
      groupsData.find(group => group.group_uuid === id)
    )

    return HttpResponse.json(groupsData.find(group => group.group_uuid === id))
  }
)
