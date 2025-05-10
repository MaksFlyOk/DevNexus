import { useGetGroup } from '@hooks/queries'
import { useTypedSelector } from '@hooks/redux-hooks'
import { Layout } from '@layout/Layout'
import { BoardView } from './board-view'

export const Home = () => {
  const { groupId } = useTypedSelector(state => state.groupState)

  const { data, isPending, isError } = useGetGroup(groupId)

  return (
    <Layout isGroupPending={isPending} isGroupError={isError} groupData={data}>
      <BoardView
        groupId={groupId}
        isPending={isPending}
        isError={isError}
        data={data}
      />
    </Layout>
  )
}
