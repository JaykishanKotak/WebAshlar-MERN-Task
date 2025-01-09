import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import userReducer from './user/userSlice'
import commonReducer from './common/commonSlice'

const logger = createLogger({
  collapsed: true,
  diff: true
})

export const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer
  },
  middleware: (getDefaultMiddleware) =>
    import.meta.env.MODE === 'development'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
