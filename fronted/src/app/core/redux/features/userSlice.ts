/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../services/userApi'

interface UserState {
  user: User | null
}

const initialState = {
  user: null
} as UserState

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    resetUserState: (state) => {
      state.user = initialState.user
    }
  }
})

export const { addUser, resetUserState } = user.actions

export default user.reducer
