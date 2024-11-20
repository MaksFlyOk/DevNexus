import { RootState } from '@redux/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelectorBoardViewState: TypedUseSelectorHook<RootState> =
  useSelector
