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
      {/* Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>. Error Component Stack:
    at div (<anonymous>)
    at Modal (Modal.tsx:11:41)
    at TableGroup (TableGroup.tsx:16:3)
    at tbody (<anonymous>)
    at table (<anonymous>)
    at div (<anonymous>)
    at Table (Table.tsx:15:25)
    at div (<anonymous>)
    at BoardView (BoardView.tsx:19:3)
    at div (<anonymous>)
    at div (<anonymous>)
    at SidebarMode (SidebarMode.tsx:22:3)
    at div (<anonymous>)
    at Layout (Layout.tsx:19:3)
    at Home (Home.tsx:7:23)
    at RenderedRoute (react-router-dom.js?v=2725ff12:4069:5)
    at Routes (react-router-dom.js?v=2725ff12:4539:5)
    at Router (react-router-dom.js?v=2725ff12:4482:15)
    at BrowserRouter (react-router-dom.js?v=2725ff12:5228:5)
    at Router (Router.tsx:7:20)
    at QueryClientProvider (@tanstack_react-query.js?v=2725ff12:2801:3)
    at Provider (react-redux.js?v=2725ff12:923:11) */}
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <AddNewTaskBoardModal
          columnName={groupName}
          setIsShow={setIsShow}
          group_uuid={group_uuid}
        />
      </Modal>
      <tr className={`${convertTableColor(groupColor)}`}>
        <th colSpan={8}>
          <div className=''>
            <div className='d-flex justify-content-between'>
              <div className='d-flex align-items-baseline gap-3'>
                <h4 className='column-name'>{groupName}</h4>
                <h6>(Sum: {tasks?.length})</h6>
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
          key={`${line.title}${line.code}`}
          line={line}
          groupColor={groupColor}
          iterLine={iter + 1}
        />
      ))}
    </>
  )
}
