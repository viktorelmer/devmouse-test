import { ITableActions, ITableConfig } from "./types"

export const API_MASK = "https://private-anon-7b6c8709ff-pizzaapp.apiary-mock.com"

export const GET_RESTS_KEY = "restaurants/getRestaurants"
export const GET_PRODUCTS_KEY = "restaurants/getProducts"

export const TABLE_ACTION_KEYS: ITableActions = {
    REMOVE: "remove"
}

export const ORDER_STORAGE_KEY = "order_data"

export const ORDER_TABLE_CONFIG: ITableConfig = {
  table_header: [
    { label: "Restaurant", key: "restaurant" },
    { label: "Product", key: "name" },
    { label: "Cost", key: "price", contentEditable: true, style: "text-center" },
    { label: "Actions", key: "actions", action: TABLE_ACTION_KEYS.REMOVE, style: "text-center" },
  ],
};