import { RootState } from '@redux'
import { BoardViewStateType, BoardViewType } from '@redux/slices'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: BoardViewStateType = { boardView: 'kanban' }

export const BoardViewStateSlice = createSlice({
  name: 'BoardViewState',
  initialState,
  reducers: {
    setBoardViewState: (state, action: PayloadAction<BoardViewType>) => {
      state.boardView = action.payload
    }
  }
})

export const BoardViewStateActions = BoardViewStateSlice.actions
export const BoardViewStateReducer = BoardViewStateSlice.reducer
export const BoardViewState = (state: RootState) => state.boardViewState
