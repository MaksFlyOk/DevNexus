import { useTypedSelectorBoardViewState } from '@hooks/redux-hooks'
import { Layout } from '@layout'

export const Home = () => {
  const { boardView } = useTypedSelectorBoardViewState(
    state => state.boardViewState
  )

  return (
    <Layout groupsData={} membersData={} userData={}>
      <h1>{boardView}</h1>
    </Layout>
  )
}
