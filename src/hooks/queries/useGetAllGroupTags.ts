import groupService from '@services/groupService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { TagType } from '@types'

export const useGetAllGroupTags = (
  group_uuid: string
): QueryObserverResult<TagType[]> => {
  return useQuery<TagType[]>({
    queryKey: [`get all user tags`],
    queryFn: async () => {
      const response = await groupService.getAllTagGroup(group_uuid)
      return response.data
    }
  })
}
