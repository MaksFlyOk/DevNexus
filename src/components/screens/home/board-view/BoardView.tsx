import { useTypedSelector } from '@hooks/redux-hooks'
import { GroupType } from '@types'
import { Kanban } from '@ui/kanban'
import { List } from '@ui/list'
import { Modal } from '@ui/modal'
import { Spinner } from '@ui/spinner'
import { Table } from '@ui/table'
import { useState } from 'react'
import { BoardInfoModal } from './BoardInfoModal'

interface BoardViewProps {
  groupId: string | undefined
  isPending: boolean
  isError: boolean
  data: GroupType | undefined
}

export const BoardView = ({
  groupId,
  isPending,
  isError,
  data
}: BoardViewProps) => {
  const { boardView } = useTypedSelector(state => state.boardViewState)
  const { isBoardLoading } = useTypedSelector(state => state.boardState)
  const [isShow, setIsShow] = useState(false)

  return groupId === undefined ? (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <p className='fs-2 text-body-secondary'>Выберете группу</p>
    </div>
  ) : isPending ? (
    <Spinner />
  ) : isError ? (
    <div className='d-flex w-100 h-100 justify-content-center align-items-center py-3'>
      <h1>
        <span className='badge text-bg-danger'>Error</span>
      </h1>
    </div>
  ) : (
    <>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <BoardInfoModal
          setIsShow={setIsShow}
          groupData={data}
          isGroupPending={isPending}
          isGroupError={isError}
        />
      </Modal>
      <div className='col h-100 d-flex flex-column p-0'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex'>
            {/* TODO: */}
            <h3>{data?.name}</h3>
            <button
              type='button'
              className='btn border-0'
              onClick={() => setIsShow(true)}
            >
              <h3>
                <i className='bi bi-three-dots'></i>
              </h3>
            </button>
          </div>
          {isBoardLoading ? <Spinner padding={0} /> : null}
        </div>
        {boardView === 'kanban' ? (
          <Kanban boardData={data as GroupType} />
        ) : boardView === 'table' ? (
          <Table boardData={data as GroupType} />
        ) : (
          <List boardData={data as GroupType} />
        )}
      </div>
    </>
  )
}
