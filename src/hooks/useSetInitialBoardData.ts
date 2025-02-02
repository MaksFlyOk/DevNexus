import { BoardType } from '@types'
import { isDeepEqual } from '@utils/isDeepEqual'
import { useEffect } from 'react'
import { useActions, useTypedSelector } from './redux-hooks'

export const useSetInitialBoardData = (boardData: BoardType | undefined) => {
  const { setInitial } = useActions()
  const { columns } = useTypedSelector(state => state.boardState)

  return useEffect(() => {
    console.log(columns, boardData.columns)

    if (
      boardData &&
      (columns?.length === 0 || isDeepEqual(columns, boardData.columns))
    ) {
      setInitial(boardData)
    }
  }, [boardData])
}
