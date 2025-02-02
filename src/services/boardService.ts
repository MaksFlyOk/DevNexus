import { $axios } from '@axios'
import { boardData } from '@mocks/boardData'
import { BoardType } from '@types'
import { AxiosResponse } from 'axios'

type GroupIdType = number | undefined

class BoardService {
  async getBoard(groupId: GroupIdType): Promise<AxiosResponse<BoardType>> {
    if (import.meta.env.VITE_APP_IS_MOCKUP === 'true') {
      return { data: boardData } as AxiosResponse<BoardType>
    }
    return await $axios.get<BoardType>(`/board/${groupId}`)
  }
}

export default new BoardService()
