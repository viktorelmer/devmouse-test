import { configureStore } from '@reduxjs/toolkit'
import ordersSlice from './slices/ordersSlice'
import restaurantsSlice from './slices/restaurantsSlice'

export const store = configureStore({
  reducer: {
    orders: ordersSlice,
    restaurants: restaurantsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch