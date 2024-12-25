import boardService from '@services/boardService'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { BoardType } from '@types'

export const useGetBoard = (): QueryObserverResult<BoardType> => {
  return useQuery<BoardType>({
    queryKey: [`get board`],
    queryFn: async () => {
      const response = await boardService.getBoard()
      return response.data
    }
  })
}
