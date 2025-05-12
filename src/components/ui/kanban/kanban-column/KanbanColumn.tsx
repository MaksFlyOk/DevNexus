import { useMoveCard } from '@hooks/mutations'
import { ColumnType, TaskType } from '@types'
import { Modal } from '@ui'
import { AddNewTaskBoardModal } from '@ui/add-new-task-board-modal'
import { convertBgColor } from '@utils/convertBgColor'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { KanbanCard } from '../kanban-card'
import './KanbanColumn.scss'

interface KanbanColumnProps {
  columnName: ColumnType['name']
  columnColor: ColumnType['color'] | undefined
  tasks: TaskType[] | undefined
  group_uuid: string
  moveTask: (movedTask: {
    task: TaskType
    columnName: TaskType['column']
  }) => void
}

export function KanbanColumn({
  columnName,
  columnColor,
  moveTask,
  group_uuid,
  tasks
}: KanbanColumnProps) {
  const { mutateAsync } = useMoveCard()

  const [{ isOver }, drop] = useDrop<
    TaskType,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: 'task',
    drop: task => {
      moveTask({ task, columnName })
      mutateAsync({ task, column: columnName })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const [isShow, setIsShow] = useState(false)

  return (
    <div
      ref={drop}
      className='col-12 col-sm-6 col-md-4 col-xxl-3 overflow-y-scroll rounded-4'
      style={{ scrollSnapAlign: 'start' }}
    >
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewTaskBoardModal
          columnName={columnName}
          setIsShow={setIsShow}
          group_uuid={group_uuid}
        />
      </Modal>
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
              ' p-3 rounded-top-4 d-flex justify-content-between gap-1'
            }
          >
            <div>
              <h4 className='column-name'>{columnName}</h4>
              <h6>Sum: {tasks?.length}</h6>
            </div>
            <button
              type='button'
              className='btn btn-outline-dark'
              onClick={() => setIsShow(true)}
            >
              +
            </button>
          </div>
        </div>
        <div className='d-flex flex-column pt-3 pb-2 px-2 gap-3'>
          {tasks?.map(task => (
            <KanbanCard
              key={`${task.title}${task.code}`}
              task={task}
              color={columnColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
