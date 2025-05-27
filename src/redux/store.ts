import {
  AuthStateReducer,
  BoardStateReducer,
  BoardViewStateReducer,
  GroupStateReducer,
  notificationStateReducer
} from '@redux/slices'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { userListStateReducer } from './slices/userListSate'

export const store = configureStore({
  reducer: {
    boardViewState: BoardViewStateReducer,
    authState: AuthStateReducer,
    groupState: GroupStateReducer,
    boardState: BoardStateReducer,
    userListState: userListStateReducer,
    notificationState: notificationStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
