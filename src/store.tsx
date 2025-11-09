import { combineReducers, configureStore } from "@reduxjs/toolkit"
import searchReducer from "./slices/searchSlice"
import cartReducer from "./slices/cartSlice"

export default configureStore({
  reducer: combineReducers({
    ourData: combineReducers({
      filters: searchReducer,
      cart: cartReducer
    })
  })
})