import { useGetBoard } from '@hooks/queries/useGetBoard'
import { useKanbanState } from '@redux/slices'
import { Spinner } from '@ui/spinner'
import { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { KanbanColumn } from './kanban-column'

export const Kanban = () => {
  const { isPending, isError, data: boardData } = useGetBoard()
  const { state, moveTicket, setInitial } = useKanbanState()

  useEffect(() => {
    if (boardData) {
      setInitial(boardData)
    }
  }, [boardData])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='overflow-x-scroll d-flex flex-row gap-3 h-100 p-2'>
        {isPending || !state || Object.keys(state).length == 0 ? (
          <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
            <Spinner />
          </div>
        ) : isError ? (
          <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
            <h1>
              <span className='badge text-bg-danger'>Error</span>
            </h1>
          </div>
        ) : (
          Object.keys(state.tasks).map(columnName => (
            <KanbanColumn
              tasks={state.tasks[columnName]}
              columnColor={
                boardData.columns.find(column => column.name === columnName)
                  ?.color
              }
              key={columnName}
              moveTask={moveTicket}
              columnName={columnName}
            />
          ))
        )}
      </div>
    </DndProvider>
  )
}
