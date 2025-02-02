import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useSetInitialBoardData } from '@hooks/useSetInitialBoardData'
import { BoardType } from '@types'
import { Spinner } from '@ui/spinner'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import withScrolling from 'react-dnd-scrolling'
import { ListGroup } from './list-group'

export const List = ({ boardData }: { boardData: BoardType }) => {
  const { columns } = useTypedSelector(state => state.boardState)
  const { moveTask } = useActions()

  const ScrollingComponent = withScrolling('div')

  useSetInitialBoardData(boardData)

  return (
    <DndProvider backend={HTML5Backend}>
      <ScrollingComponent className='d-flex flex-column gap-4 p-2 w-100 h-100 overflow-y-scroll'>
        {!columns || columns.length == 0 ? (
          <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
            <Spinner />
          </div>
        ) : (
          columns.map(column => (
            <ListGroup
              tasks={column.tasks}
              groupColor={column.color}
              key={column.name}
              groupName={column.name}
              moveTask={movedTask =>
                moveTask({
                  task: movedTask.task,
                  newColumn: movedTask.columnName
                })
              }
            />
          ))
        )}
      </ScrollingComponent>
    </DndProvider>
  )
}
