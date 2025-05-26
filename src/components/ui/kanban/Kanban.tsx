import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useIsFetching, useQueryClient } from '@tanstack/react-query'
import { GroupType } from '@types'
import { Spinner } from '@ui/spinner'
import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDndScrolling } from 'react-dnd-scrolling'
import { KanbanColumn } from './kanban-column'

interface KanbanProps {
  boardData: GroupType
}

const KanbanInner = ({ boardData }: KanbanProps) => {
  const { moveTask, setInitialBoardState, setIsBoardLoading } = useActions()

  const { board, boardId, isBoardLoading } = useTypedSelector(
    state => state.boardState
  )
  const { groupId } = useTypedSelector(state => state.groupState)

  const queryClient = useQueryClient()

  const scrollRef = useRef<HTMLDivElement>(null)

  const invalidateBoardData = useIsFetching({ queryKey: ['get board'] })

  useDndScrolling(scrollRef)

  useEffect(() => {
    if (boardData.group_uuid !== boardId || isBoardLoading) {
      console.log('update')

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
      style={{ scrollSnapType: 'x mandatory' }}
      className='overflow-x-scroll d-flex flex-row gap-3 h-100 p-2'
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
          <KanbanColumn
            tasks={column.tasks}
            group_uuid={boardData.group_uuid}
            key={column.name + boardData.id}
            moveTask={movedTask =>
              moveTask({
                task: movedTask.task,
                newColumn: movedTask.columnName
              })
            }
            columnName={column.name}
            columnColor={column.color}
          />
        ))
      )}
    </div>
  )
}
export const Kanban = ({ boardData }: KanbanProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanInner boardData={boardData} />
    </DndProvider>
  )
}
