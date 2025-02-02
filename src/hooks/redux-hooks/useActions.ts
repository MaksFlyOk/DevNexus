import {
  AuthStateActions,
  BoardStateActions,
  BoardViewStateActions,
  GroupStateActions
} from '@redux/slices'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const allActions = {
  ...BoardViewStateActions,
  ...AuthStateActions,
  ...GroupStateActions,
  ...BoardStateActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
