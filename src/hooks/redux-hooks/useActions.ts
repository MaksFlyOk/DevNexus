import { AuthStateActions, BoardViewStateActions } from '@redux/slices'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const allActions = {
  ...BoardViewStateActions,
  ...AuthStateActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
