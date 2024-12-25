import { RootState } from '@redux'
import { AuthStateType, AuthType } from '@redux/slices'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState: AuthStateType = {
  auth: Cookies.get(import.meta.env.VITE_APP_TOKEN) ? true : false
}

export const AuthStateSlice = createSlice({
  name: 'AuthState',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthType>) => {
      state.auth = action.payload
    }
  }
})

export const AuthStateActions = AuthStateSlice.actions
export const AuthStateReducer = AuthStateSlice.reducer
export const AuthState = (state: RootState) => state.boardViewState
