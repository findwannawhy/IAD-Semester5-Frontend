import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

interface CartState {
  cartData: {
    experiment_id: number
    sample_count: number
  }
  isLoading: boolean
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: {
      experiment_id: 0,
      sample_count: -1,
    },
    isLoading: false
  } as CartState,
  reducers: {
    setCartData(state, { payload }) {
      state.cartData = payload
    },
    setLoading(state, { payload }) {
      state.isLoading = payload
    }
  }
})

export const useCartData = () =>
  useSelector((state: any) => state.ourData.cart.cartData)

export const useCartLoading = () =>
  useSelector((state: any) => state.ourData.cart.isLoading)

export const {
  setCartData: setCartDataAction,
  setLoading: setLoadingAction
} = cartSlice.actions

export default cartSlice.reducer