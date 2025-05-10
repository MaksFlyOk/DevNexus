import { RootState } from '@redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@types'

const initialState: { memberList: UserType[] | null } = { memberList: null }

export const userListSlice = createSlice({
  name: 'BoardState',
  initialState,
  reducers: {
    setInitialMemberListState: (state, action: PayloadAction<UserType[]>) => {
      state.memberList = action.payload
    }
  }
})

export const userListStateActions = userListSlice.actions
export const userListStateReducer = userListSlice.reducer
export const userListState = (state: RootState) => state.boardState
