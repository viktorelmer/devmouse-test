import { TABLE_ACTION_KEYS} from './const'

export interface IRestaurant {
  id: number,
  name: string,
  address1: string,
  address2: string,
  latitude: number,
  longitude: number
}

export interface IProduct {
    id: number,
    category: string,
    name: string,
    topping: string[],
    price: number,
    rank: number
}

export interface IOrder {
    id: number,
    product_id: number,
    restaurant_id: number,
    restaurant: string,
    price: number,
    name: string,
}

export interface ICachedData<T> {
  lifeTime: number,
  timeStamp: number,
  data: T
}

export type TableActions = "remove"

export interface ITableActions {
  [key: string]: TableActions
}

export interface ITableHeaderCol {
  label: string,
  key: string,
  contentEditable?: boolean,
  action?: TableActions,
  style?: string
}

export interface ITableConfig {
  table_header: ITableHeaderCol[]
}