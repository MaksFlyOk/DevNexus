import {
  AuthStateActions,
  BoardStateActions,
  BoardViewStateActions,
  GroupStateActions
} from '@redux/slices'
import { userListStateActions } from '@redux/slices/userListSate'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const allActions = {
  ...BoardViewStateActions,
  ...AuthStateActions,
  ...GroupStateActions,
  ...BoardStateActions,
  ...userListStateActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
