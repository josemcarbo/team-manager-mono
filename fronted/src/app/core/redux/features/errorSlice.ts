/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IError {
  message: string
  status: number
}

interface ErrorState {
  error: IError | null
}

const initialState = {
  error: null
} as ErrorState

export const error = createSlice({
  name: 'error',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null
    },
    refreshOneError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload
    }
  }
})

export const {
  refreshOneError,
  resetError
} = error.actions

export default error.reducer
