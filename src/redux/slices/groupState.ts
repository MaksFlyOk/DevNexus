import { RootState } from '@redux'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type GroupStateType = { groupId: string | undefined }

const initialState: GroupStateType = {
  groupId: undefined
}

export const groupStateSlice = createSlice({
  name: 'GroupState',
  initialState,
  reducers: {
    setGroupId: (state, action: PayloadAction<GroupStateType['groupId']>) => {
      state.groupId = action.payload
    }
  }
})

export const GroupStateActions = groupStateSlice.actions
export const GroupStateReducer = groupStateSlice.reducer
export const GroupState = (state: RootState) => state.groupState
