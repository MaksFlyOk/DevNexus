import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { GroupType } from '@types'
import { Spinner } from '@ui/spinner'
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDndScrolling } from 'react-dnd-scrolling'
import { ListGroup } from './list-group'

interface ListProps {
  boardData: GroupType
}

const ListInner = ({ boardData }: ListProps) => {
  const { moveTask, setInitialBoardState, setIsBoardLoading } = useActions()

  const { board, boardId, isBoardLoading } = useTypedSelector(
    state => state.boardState
  )
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const scrollRef = useRef<HTMLDivElement>(null)

  const invalidateBoardData = useIsFetching({ queryKey: ['get board'] })

  const [isShowListGroups, setIsShowListGroups] = useState<{
    [key: string]: boolean
  }>(
    boardData.board.columns?.reduce((acc, column) => {
      acc[column.name] = false
      return acc
    }, {} as { [key: string]: boolean })
  )

  useDndScrolling(scrollRef)

  useEffect(() => {
    if (boardData.group_uuid !== boardId || isBoardLoading) {
      setInitialBoardState(boardData)
    }

    if (!isEqual(boardData.board, board)) {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
      setIsBoardLoading({ state: true })
    }
  }, [boardData, boardId, board])

  useEffect(() => {
    if (!invalidateBoardData) {
      setIsBoardLoading({ state: false })
    }
  }, [invalidateBoardData])

  return (
    <div
      ref={scrollRef}
      className='d-flex flex-column gap-4 p-2 w-100 h-100 overflow-y-scroll'
    >
      {!board ? (
        <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
          <Spinner />
        </div>
      ) : board.columns?.length === 0 ? (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
          <p className='h1 text-white-50'>Здесь пока пусто</p>
        </div>
      ) : (
        board.columns?.map(column => (
          <ListGroup
            tasks={column.tasks}
            groupColor={column.color}
            group_uuid={boardData.group_uuid}
            key={column.name}
            groupName={column.name}
            setIsShowGroup={setIsShowListGroups}
            isShowGroup={isShowListGroups[column.name] ?? false}
            moveTask={movedTask =>
              moveTask({
                task: movedTask.task,
                newColumn: movedTask.columnName
              })
            }
          />
        ))
      )}
    </div>
  )
}

export const List = ({ boardData }: ListProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListInner boardData={boardData} />
    </DndProvider>
  )
}
