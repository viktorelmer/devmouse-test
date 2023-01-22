import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from '../../exports/types'
import { ORDER_STORAGE_KEY } from '../../exports/const'
import { getFromLocalStorage, updateLocalStorage } from '../../exports/utils'

interface IInitialState {
  data: IOrder[]
}

const initialState: IInitialState = {
  data: []
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    loadSavedOrder: (state) => {
      const savedOrder = getFromLocalStorage<IOrder[]>(ORDER_STORAGE_KEY)
      if (savedOrder) state.data = savedOrder
    },
    editOrder: (state, action: PayloadAction<IOrder>) => {
      const indexOfOrderToEdit = state.data.findIndex(order => order.id === action.payload.id)

      if (indexOfOrderToEdit >= 0) state.data[indexOfOrderToEdit] = action.payload
      updateLocalStorage(ORDER_STORAGE_KEY, state.data)
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      const indexOfOrderToRemove = state.data.findIndex(order => order.id === action.payload)

      if (indexOfOrderToRemove >= 0) state.data.splice(indexOfOrderToRemove, 1)
      updateLocalStorage(ORDER_STORAGE_KEY, state.data)
    },
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.data.push(action.payload)
      updateLocalStorage(ORDER_STORAGE_KEY, state.data)
    },
  },
})

export const { editOrder, removeOrder, addOrder, loadSavedOrder } = ordersSlice.actions

export default ordersSlice.reducer