import groupService from '@services/groupService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { AccentColorsType, TaskType } from '@types'

export const useGetCard = (
  groupId: string | undefined,
  cardCode: string | undefined
): QueryObserverResult<TaskType & { column_color: AccentColorsType }> => {
  return useQuery<TaskType & { column_color: AccentColorsType }>({
    queryKey: [`get card`, groupId, cardCode],
    queryFn: async () => {
      const response = await groupService.getCardColumnGroup(groupId, cardCode)

      return response.data
    }
  })
}
