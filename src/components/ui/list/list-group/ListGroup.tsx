import { ColumnType, TaskType } from '@types'
import { AddGroupBoardModal } from '@ui/add-group-board-modal'
import { Modal } from '@ui/modal'
import { convertBgColor } from '@utils/convertBgColor'
import { convertBorderColor } from '@utils/convertBorderColor'
import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { ListItem } from '../list-item'

interface ListGroupProps {
  groupName: ColumnType['name']
  groupColor: ColumnType['color'] | undefined
  tasks: TaskType[] | undefined
  moveTask: (movedTask: {
    task: TaskType
    columnName: TaskType['column']
  }) => void
}

export const ListGroup = ({
  tasks,
  groupColor,
  groupName,
  moveTask
}: ListGroupProps) => {
  const [{ isOver }, drop] = useDrop<
    TaskType,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: 'task',
    drop: task => {
      moveTask({ task, columnName: groupName })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const [isShow, setIsShow] = useState(false)
  const [openListGroupState, setOpenListGroupState] = useState(false)

  return (
    <div
      ref={drop}
      className={`d-flex flex-column gap-3 rounded-4 ${
        isOver
          ? openListGroupState
            ? convertBgColor(groupColor)
            : 'bg-light-subtle'
          : 'bg-light-subtle'
      }`}
    >
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddGroupBoardModal setIsShow={setIsShow} />
      </Modal>
      <div
        className={`d-flex justify-content-between py-2 px-3 ${
          openListGroupState
            ? `rounded-top-4 ${convertBgColor(groupColor)}`
            : `rounded-4 ${
                isOver
                  ? `border border-2 ${convertBorderColor(groupColor)}`
                  : `${convertBgColor(groupColor)}`
              }`
        }`}
      >
        <div>
          <h4>{groupName}</h4>
          <h6>Sum: {tasks?.length}</h6>
        </div>
        <div className='d-flex gap-3'>
          <button
            type='button'
            className='btn btn-outline-dark'
            onClick={() => setIsShow(true)}
          >
            +
          </button>
          <button
            type='button'
            className='btn btn-outline-dark'
            onClick={() => setOpenListGroupState(prev => !prev)}
          >
            &#8595;
          </button>
        </div>
      </div>
      <div
        className={`d-flex p-2 flex-column gap-3 ${
          openListGroupState ? 'd-block' : 'd-none'
        }`}
      >
        {tasks?.map(task => (
          <ListItem key={task.name} task={task} color={groupColor} />
        ))}
      </div>
    </div>
  )
}
