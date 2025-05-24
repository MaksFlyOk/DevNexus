import groupService from '@services/groupService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { GroupType } from '@types'

type GroupIdType = string | undefined

export const useGetGroup = (
  groupId: GroupIdType
): QueryObserverResult<GroupType> => {
  return useQuery<GroupType>({
    queryKey: [`get board`, groupId],
    queryFn: async () => {
      const response = await groupService.getGroup(groupId)

      return response.data
    },
    enabled: groupId ? true : false
  })
}
