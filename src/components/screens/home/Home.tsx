import { useTypedSelector } from '@hooks/redux-hooks'
import { Layout } from '@layout/Layout'
import { Kanban } from '@ui/kanban'
import { Table } from '@ui/table'

export const Home = () => {
  const { boardView } = useTypedSelector(state => state.boardViewState)

  return (
    <Layout membersListId={1}>
      {boardView === 'kanban' ? (
        <Kanban />
      ) : boardView === 'table' ? (
        <Table />
      ) : (
        <h1>boardView</h1>
      )}
    </Layout>
  )
}
