import { ColumnType, TaskType } from '@types'
import { Modal } from '@ui'
import { AddNewTaskBoardModal } from '@ui/add-new-task-board-modal'
import { convertTableColor } from '@utils/convertTableColor'
import { useState } from 'react'
import { TableLine } from '../table-line/TableLine'

interface TableGroupProps {
  groupName: ColumnType['name']
  groupColor: ColumnType['color'] | undefined
  tasks: TaskType[] | undefined
  group_uuid: string
}

export function TableGroup({
  groupName,
  groupColor,
  group_uuid,
  tasks
}: TableGroupProps) {
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {/* Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>. */}
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewTaskBoardModal
          columnName={groupName}
          setIsShow={setIsShow}
          group_uuid={group_uuid}
        />
      </Modal>
      <tr className={`${convertTableColor(groupColor)}`}>
        <th colSpan={8}>
          <div>
            <div className='d-flex align-items-center gap-4'>
              <h4 className='column-name'>{groupName}</h4>
              <button
                type='button'
                className='btn btn-outline-dark'
                onClick={() => setIsShow(true)}
              >
                +
              </button>
            </div>
          </div>
        </th>
      </tr>
      {tasks?.length === 0 ? (
        <tr>
          <th colSpan={8}>Empty</th>
        </tr>
      ) : (
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Задача</th>
          <th scope='col'>Исполнитель</th>
          <th scope='col'>Дедлайн</th>
          <th scope='col'>Статус</th>
          <th scope='col'>Описание</th>
          <th scope='col'>Теги</th>
          <th scope='col'>Дата создания</th>
        </tr>
      )}
      {tasks?.map((line, iter) => (
        <TableLine
          key={`${line.title}_${line.code}_${iter}`}
          line={line}
          groupColor={groupColor}
          iterLine={iter + 1}
        />
      ))}
    </>
  )
}
