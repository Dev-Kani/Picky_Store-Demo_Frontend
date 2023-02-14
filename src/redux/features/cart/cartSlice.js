import { createSlice } from "@reduxjs/toolkit"

const { cartItems, totalCartItemQty, total } = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {}

const savedShippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const savedPaymentMethod = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''

const initialState = {
  cartItems: cartItems || [],
  totalCartItemQty: Number(totalCartItemQty),
  shippingAddress: savedShippingAddress,
  paymentMethod: savedPaymentMethod,
  shippingCost: Number(10),
  tax: Number(2.5),
  total: Number(total) || 0
}

const updateTotals = (state) => {
  state.totalCartItemQty = state.cartItems.reduce((total, item) => total + item.eachItemQty, 0)
  state.total = state.cartItems.reduce((total, item) =>
    total + item.totalItemPrice, 0) + state.shippingCost + state.tax
  localStorage.setItem('cart', JSON.stringify(state))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty, totalItemPrice } = action.payload
      const existingItem = state.cartItems.find(i => i.cartItem._id === product._id)
      if (existingItem) {
        existingItem.eachItemQty += Number(qty)
        existingItem.totalItemPrice += totalItemPrice
      } else {
        state.cartItems.push({ cartItem: product, eachItemQty: Number(qty), totalItemPrice })
      }
      updateTotals(state)
    },
    incrementItemQty: (state, action) => {
      const item = state.cartItems.find(i => i.cartItem._id === action.payload._id)
      if (item && item.eachItemQty < item.cartItem.countInStock) {
        item.eachItemQty += 1
        item.totalItemPrice += item.cartItem.price
        updateTotals(state)
      }
    },
    decrementItemQty: (state, action) => {
      const item = state.cartItems.find(i => i.cartItem._id === action.payload._id)
      if (item) {
        if (item.eachItemQty > 1) {
          item.eachItemQty -= 1
          item.totalItemPrice -= item.cartItem.price
          updateTotals(state)
        } else {
          state.cartItems = state.cartItems.filter(i => i.cartItem._id !== action.payload._id)
          updateTotals(state)
        }
      }
    },
    removeCartItems: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.cartItem._id !== action.payload._id)
      updateTotals(state)
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
    },
    cartItemsReset: (state, action) => {
      state.cartItems = []
      state.totalCartItemQty = 0
      // state.shippingAddress = ''
      // state.paymentMethod = ''
      state.total = 0
      localStorage.removeItem('cart')
    }
  }
})

export const {
  addToCart,
  incrementItemQty,
  decrementItemQty,
  removeCartItems,
  saveShippingAddress,
  savePaymentMethod,
  cartItemsReset
} = cartSlice.actions

export default cartSlice.reducer
