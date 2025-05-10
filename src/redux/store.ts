import {
  AuthStateReducer,
  BoardStateReducer,
  BoardViewStateReducer,
  GroupStateReducer
} from '@redux/slices'
import { configureStore } from '@reduxjs/toolkit'
import { userListStateReducer } from './slices/userListSate'

export const store = configureStore({
  reducer: {
    boardViewState: BoardViewStateReducer,
    authState: AuthStateReducer,
    groupState: GroupStateReducer,
    boardState: BoardStateReducer,
    userListState: userListStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
