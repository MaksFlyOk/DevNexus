import { ColumnType, TaskType } from '@types'
import { convertBgColor } from '@utils/convertBgColor'
import { useDrop } from 'react-dnd'
import { KanbanCard } from '../kanbal-card'

interface KanbanColumnProps {
  columnName: ColumnType['name']
  columnColor: ColumnType['color'] | undefined
  tasks: TaskType[] | undefined
  moveTask: (task: TaskType, columnName: TaskType['column']) => void
}

export function KanbanColumn({
  columnName,
  columnColor,
  moveTask,
  tasks
}: KanbanColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop<
    TaskType,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: 'task',
    drop: task => {
      console.log(task, canDrop, isOver, columnName)
      moveTask(task, columnName)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div ref={drop} className='col-4 overflow-y-scroll rounded-4'>
      <div
        className={
          'rounded-4 ' +
          `${isOver ? convertBgColor(columnColor) : 'bg-light-subtle'}`
        }
      >
        <div className='sticky-top bg-body'>
          <div
            className={
              convertBgColor(columnColor) +
              ' p-3 rounded-top-4 d-flex justify-content-between'
            }
          >
            <div>
              <h4>{columnName}</h4>
              <h6>Sum: {tasks?.length}</h6>
            </div>
            <button
              type='button'
              className='btn btn-outline-dark'
              onClick={() => console.log('add')}
            >
              +
            </button>
          </div>
        </div>
        <div className='d-flex flex-column pt-3 pb-2 px-2 gap-3'>
          {tasks?.map(task => (
            <KanbanCard key={task.name} task={task} color={columnColor} />
          ))}
        </div>
      </div>
    </div>
  )
}
