import boardService from '@services/boardService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { BoardType } from '@types'

type GroupIdType = number | undefined

export const useGetBoard = (
  groupId: GroupIdType
): QueryObserverResult<BoardType> => {
  return useQuery<BoardType>({
    queryKey: [`get board`, groupId],
    queryFn: async () => {
      const response = await boardService.getBoard(groupId)
      return response.data
    },
    enabled: groupId === undefined ? false : true
  })
}
