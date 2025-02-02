import { useGetBoard } from '@hooks/queries/useGetBoard'
import { useTypedSelector } from '@hooks/redux-hooks'
import { Layout } from '@layout/Layout'
import { Kanban } from '@ui/kanban'
import { List } from '@ui/list'
import { Spinner } from '@ui/spinner'
import { Table } from '@ui/table'

export const Home = () => {
  const { boardView } = useTypedSelector(state => state.boardViewState)
  const { groupId } = useTypedSelector(state => state.groupState)

  const { isPending, isError, data } = useGetBoard(groupId)

  return (
    <Layout membersListId={1}>
      {groupId === undefined ? (
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
      ) : boardView === 'kanban' ? (
        <Kanban boardData={data} />
      ) : boardView === 'table' ? (
        <Table boardData={data} />
      ) : (
        <List boardData={data} />
      )}
    </Layout>
  )
}
