import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { IRestaurant, IProduct } from '../../exports/types'
import { API_MASK, GET_PRODUCTS_KEY, GET_RESTS_KEY } from '../../exports/const'
import { cachedRequest } from '../../exports/utils'

interface IInitialState {
  data: IRestaurant[],
  products: IProduct[],
  selectedRestaurant: number | null,
  selectedProduct: number | null,
}

const initialState: IInitialState = {
  data: [],
  products: [],
  selectedRestaurant: null,
  selectedProduct: null,
}

// async 
export const loadRestaurants = createAsyncThunk(
  GET_RESTS_KEY,
  async () => {
    const data = await cachedRequest<IRestaurant[]>('GET', API_MASK + '/restaurants/', GET_RESTS_KEY)
    return data
  }
)

export const loadProducts = createAsyncThunk(
  GET_PRODUCTS_KEY,
  async (restId: number) => {
    const data = await cachedRequest<IProduct[]>('GET', API_MASK + '/restaurants/' + restId + '/menu?category=Pizza&orderBy=rank', GET_RESTS_KEY + '-' + restId)
    return data
  }
)


// slice
export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
    },
    setRestaurants: (state, action: PayloadAction<IRestaurant[]>) => {
      state.data = action.payload
    },
    selectRestaurant: (state, action: PayloadAction<number>) => {
      state.selectedRestaurant = action.payload
    },
    selectProduct: (state, action: PayloadAction<number>) => {
      state.selectedProduct = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRestaurants.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  },
})

export const { setRestaurants, selectRestaurant, setProducts, selectProduct } = restaurantsSlice.actions

export default restaurantsSlice.reducer