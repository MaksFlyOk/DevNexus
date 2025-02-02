import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useSetInitialBoardData } from '@hooks/useSetInitialBoardData'
import { BoardType } from '@types'
import { Spinner } from '@ui/spinner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import withScrolling from 'react-dnd-scrolling'
import { KanbanColumn } from './kanban-column'

export const Kanban = ({ boardData }: { boardData: BoardType }) => {
  const { moveTask } = useActions()
  const { columns } = useTypedSelector(state => state.boardState)

  const ScrollingComponent = withScrolling('div')

  useSetInitialBoardData(boardData)

  return (
    <DndProvider backend={HTML5Backend}>
      <ScrollingComponent className='overflow-x-scroll d-flex flex-row gap-3 h-100 p-2'>
        {!columns || columns.length == 0 ? (
          <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
            <Spinner />
          </div>
        ) : (
          columns.map(column => (
            <KanbanColumn
              tasks={column.tasks}
              columnColor={column.color}
              key={column.name}
              moveTask={movedTask =>
                moveTask({
                  task: movedTask.task,
                  newColumn: movedTask.columnName
                })
              }
              columnName={column.name}
            />
          ))
        )}
      </ScrollingComponent>
    </DndProvider>
  )
}
