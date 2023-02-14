import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import ProductDetails from './pages/Product_Details/ProductDetails'
import Login from './pages/Auth/Login'
import UserProfile from './pages/Auth/UserProfile'
import UsersList from './pages/Admin/UsersList'
import Register from './pages/Auth/Register'
import Shipping from './pages/Cart/Shipping'
import PaymentMethod from './pages/Cart/PaymentMethod'
import PlaceOrder from './pages/Cart/PlaceOrder'
import Order from './pages/Cart/Order'
import ProductList from './pages/Admin/ProductList'
import EditUser from './pages/Admin/EditUser'
import EditProduct from './pages/Admin/EditProduct'
import OrdersList from './pages/Admin/ordersList'
import Cart from './pages/Cart/Cart'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='search/:keyword' element={<Home />} />
    <Route path='page/:pageNumber' element={<Home />} />
    <Route path='search/:keyword/page/:pageNumber' element={<Home />} />
    <Route path='cart/:productId?' element={<Cart />} />
    <Route path='product'>
      <Route path=':productId' element={<ProductDetails />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/profile' element={<UserProfile />} />
    <Route path='/shipping' element={<Shipping />} />
    <Route path='/payment' element={<PaymentMethod />} />
    <Route path='/place-order' element={<PlaceOrder />} />
    <Route path='/order/:orderId' element={<Order />} />
    <Route path="admin/">
      <Route path='users-list' element={<UsersList />} />
      <Route path='products-list' element={<ProductList />} />
      <Route path='products-list/:pageNumber' element={<ProductList />} />
      <Route path='user/:userId/edit' element={<EditUser />} />
      <Route path='product/:productId/edit' element={<EditProduct />} />
      <Route path='orders-list' element={<OrdersList />} />
    </Route>
  </Route>
))

function App() {
  return <RouterProvider router={router} />
}

export default App
