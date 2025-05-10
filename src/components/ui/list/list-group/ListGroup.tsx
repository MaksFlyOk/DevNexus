import { $axios } from '@axios'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnType, TaskType } from '@types'
import { AddNewTaskBoardModal } from '@ui/add-new-task-board-modal'
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
  group_uuid: string
  moveTask: (movedTask: {
    task: TaskType
    columnName: TaskType['column']
  }) => void
  isShowGroup: boolean
  setIsShowGroup: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
}

export const ListGroup = ({
  tasks,
  groupColor,
  groupName,
  group_uuid,
  isShowGroup,
  setIsShowGroup,
  moveTask
}: ListGroupProps) => {
  const { boardId } = useTypedSelector(state => state.boardState)
  const { groupId } = useTypedSelector(state => state.groupState)
  const { resetToStableState } = useActions()
  const queryClient = useQueryClient()

  const { mutate } = useMutation<
    unknown,
    unknown,
    { task: TaskType; columnName: TaskType['column'] },
    unknown
  >({
    mutationFn: data => {
      return $axios.put(`/v1/group/${boardId}/card/${data.task.code}/`, {
        ...data.task,
        column: data.columnName
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get board`, groupId] })
    },
    onError: () => {
      resetToStableState()
    }
  })

  const [{ isOver }, drop] = useDrop<
    TaskType,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: 'task',
    drop: task => {
      moveTask({ task, columnName: groupName })
      mutate({ task, columnName: groupName })
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
      className={`d-flex flex-column gap-3 rounded-4 ${
        isOver
          ? isShowGroup
            ? convertBgColor(groupColor)
            : 'bg-light-subtle'
          : 'bg-light-subtle'
      }`}
    >
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewTaskBoardModal
          columnName={groupName}
          setIsShow={setIsShow}
          group_uuid={group_uuid}
        />
      </Modal>
      <div
        className={`d-flex justify-content-between py-2 px-3 ${
          isShowGroup
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
            onClick={() =>
              setIsShowGroup(prev => {
                return { ...prev, [groupName]: !prev[groupName] }
              })
            }
          >
            &#8595;
          </button>
        </div>
      </div>
      <div
        className={`d-flex p-2 flex-column gap-3 ${
          isShowGroup ? 'd-block' : 'd-none'
        }`}
      >
        {tasks?.map(task => (
          <ListItem key={task.title} task={task} color={groupColor} />
        ))}
      </div>
    </div>
  )
}
