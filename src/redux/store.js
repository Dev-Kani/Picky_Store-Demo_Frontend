import { configureStore } from '@reduxjs/toolkit'

import topProductsSlice from './features/products/topProducts'
import productListReducer from './features/products/productsList'
import cartReducer from './features/cart/cartSlice'
import productDetailsReducer from './features/products/productDetails'
import productReviewReducer from './features/products/createReview'
import authReducer from './features/auth/authSlice'
import userDetailsSlice from './features/auth/userProfile'
import userUpdateDetailsSlice from './features/auth/userUpdate'
import createOrderReducer from './features/Orders/createOrder'
import orderReducer from './features/Orders/order'
import orderPayReducer from './features/Orders/orderPay'
import myOrdersSlice from './features/Orders/myOrders'
import usersListSlice from './features/auth/admin/users/usersList'
import updateUserReducer from './features/auth/admin/users/editUser'
import handleProductsReducer from './features/auth/admin/products/deleteProducts'
import createProductReducer from './features/auth/admin/products/createProduct'
import editProductReducer from './features/auth/admin/products/editProduct'
import ordersListSlice from './features/auth/admin/orders/ordersList'
import orderDeliverReducer from './features/auth/admin/orders/orderDeliver'

export const store = configureStore({
  reducer: {
    topProducts: topProductsSlice,
    products: productListReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
    cart: cartReducer,
    auth: authReducer,
    userDetails: userDetailsSlice,
    updateUserDetails: userUpdateDetailsSlice,
    createOrder: createOrderReducer,
    orderDetails: orderReducer,
    orderPay: orderPayReducer,
    myOrders: myOrdersSlice,
    // Admin functions
    usersList: usersListSlice,
    updateUser: updateUserReducer,
    handleProducts: handleProductsReducer,
    createProduct: createProductReducer,
    editProduct: editProductReducer,
    ordersList: ordersListSlice,
    orderDeliver: orderDeliverReducer
  }
})