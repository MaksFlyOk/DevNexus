import groupService from '@services/groupService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { TagType } from '@types'

export const useGetAllTaskTags = (
  group_uuid: string
): QueryObserverResult<TagType[]> => {
  return useQuery<TagType[]>({
    queryKey: [`get all task tags`],
    queryFn: async () => {
      const response = await groupService.getAllCardTagGroup(group_uuid)
      return response.data
    }
  })
}
