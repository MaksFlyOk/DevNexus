import { BoardViewStateActions } from '@redux/slices'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const allActions = {
  ...BoardViewStateActions
}

export const useActionsBoardViewState = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
