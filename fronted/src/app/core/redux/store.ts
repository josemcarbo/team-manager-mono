import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './services/authAApi'
import user from './features/userSlice'
import project from './features/projectSlice'
import { userApi } from './services/userApi'
import { projectApi } from './services/projectApi'
import { cardApi } from './services/cardApi'

export const store = configureStore({
  reducer: {
    user,
    project,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [cardApi.reducerPath]: cardApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({})
      .concat([authApi.middleware])
      .concat([userApi.middleware])
      .concat([projectApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
