import { AuthStateReducer, BoardViewStateReducer } from '@redux/slices'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    boardViewState: BoardViewStateReducer,
    authState: AuthStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
