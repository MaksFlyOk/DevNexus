import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { GroupType } from '@types'
import { Spinner } from '@ui/spinner'
import { isEqual } from 'lodash'
import { useEffect } from 'react'
import { TableGroup } from './table-group/TableGroup'

// TODO:

interface TableProps {
  boardData: GroupType
}

export const Table = ({ boardData }: TableProps) => {
  const { setInitialBoardState, setIsBoardLoading } = useActions()

  const { board, boardId, isBoardLoading } = useTypedSelector(
    state => state.boardState
  )
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const invalidateBoardData = useIsFetching({ queryKey: ['get board'] })

  useEffect(() => {
    if (boardData.group_uuid !== boardId || isBoardLoading) {
      console.log('update')
      console.log('into kanban', boardData)

      setInitialBoardState(boardData)
    }

    if (!isEqual(boardData.board, board)) {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      setIsBoardLoading({ state: true })
    }

    if (!invalidateBoardData) {
      setIsBoardLoading({ state: false })
    }
  }, [boardData, boardId, board, invalidateBoardData])

  return (
    <div className='overflow-x-scroll p-2 h-100'>
      {!board ? (
        <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
          <Spinner />
        </div>
      ) : board.columns?.length === 0 ? (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
          <p className='h1 text-white-50'>Здесь пока пусто</p>
        </div>
      ) : (
        <table className='table table-hover table-striped'>
          <tbody className='table-group-divider'>
            {board.columns?.map(column => (
              <TableGroup
                tasks={column.tasks}
                group_uuid={boardData.group_uuid}
                key={column.name + boardData.id}
                groupName={column.name}
                groupColor={column.color}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
