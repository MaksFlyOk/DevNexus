import groupsService from '@services/groupsService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { GroupType } from '@types'

export const useGetGroups = (): QueryObserverResult<GroupType[]> => {
  return useQuery<GroupType[]>({
    queryKey: [`get groups`],
    queryFn: async () => {
      const response = await groupsService.getGroups()
      return response.data
    }
  })
}
