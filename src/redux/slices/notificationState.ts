import { AppThunk, RootState } from '@redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
  id: string
  message: string
  type: 'success' | 'danger' | 'info' | 'warning'
}

interface NotificationsState {
  items: Notification[]
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

const initialState: NotificationsState = { items: [] }

export const notificationSlice = createSlice({
  name: 'BoardState',
  initialState,
  reducers: {
    addNewNotificationState: (state, action: PayloadAction<Notification>) => {
      state.items.push(action.payload)
    },
    removeNotificationState: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  }
})

export const notificationStateActions = notificationSlice.actions
export const notificationStateReducer = notificationSlice.reducer
export const notificationState = (state: RootState) => state.boardState

export const addTimedNotification =
  (notification: Omit<Notification, 'id'>, timeout = 4000): AppThunk =>
  dispatch => {
    const fullNotification = { ...notification, id: generateId() }

    dispatch(notificationStateActions.addNewNotificationState(fullNotification))

    setTimeout(() => {
      dispatch(
        notificationStateActions.removeNotificationState(fullNotification.id)
      )
    }, timeout)
  }
