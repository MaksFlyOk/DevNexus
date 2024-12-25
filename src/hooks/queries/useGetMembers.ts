import membersService from '@services/membersService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { MemberType } from '@types'

export const useGetMembers = (
  groupId: number
): QueryObserverResult<MemberType[]> => {
  return useQuery<MemberType[]>({
    queryKey: [`get members list for group ${groupId}`],
    queryFn: async () => {
      const response = await membersService.getMembers(groupId)
      return response.data
    }
  })
}
