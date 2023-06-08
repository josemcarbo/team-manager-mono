import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './services/authAApi'
import user from './features/userSlice'
import board from './features/boardSlice'
import card from './features/cardSlice'
import { userApi } from './services/userApi'
import { boardApi } from './services/boardApi'
import { cardApi } from './services/cardApi'

export const store = configureStore({
  reducer: {
    user,
    board,
    card,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat([authApi.middleware])
      .concat([userApi.middleware])
      .concat([boardApi.middleware])
      .concat([cardApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
