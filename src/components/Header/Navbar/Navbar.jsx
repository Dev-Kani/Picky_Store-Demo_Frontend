import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../../../redux/features/auth/authSlice'
import { userDetailsReset } from '../../../redux/features/auth/userProfile'
import { cartItemsReset } from '../../../redux/features/cart/cartSlice'
import { resetMyOrders } from '../../../redux/features/orders/myOrders'
import SearchBox from '../../SearchBox/SearchBox'
import './Navbar.css'

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const numItems = useSelector(state => state.cart.cartItems?.length)
  const userLogin = useSelector(state => state.auth.user)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-nav")) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(cartItemsReset())
    dispatch(userDetailsReset())
    dispatch(reset())
    dispatch(resetMyOrders())
    navigate('/login')
    toggleDropdown()
  }

  // <NavDropdown.Divider />

  return (
    <nav className='navbar'>
      <Container>
        <div className='navbar__content'>
          <div className='navbar__logo'>
            <Link to="/"><h1>Picky</h1></Link>
          </div>
          <SearchBox />
          <div className='navbar__login'>
            <Link to='/cart' className='navbar__cart'>
              <span className='cart__badge'><span>{numItems || 0}</span></span>
              <span><i className='fas fa-shopping-cart'></i> Cart</span>
            </Link>
            {userLogin ? (
              <div className="dropdown-nav">
                <button onClick={toggleDropdown}>{userLogin.name}
                  <i className="fas fa-caret-down" />
                </button>
                {showDropdown && (
                  <div className="dropdown-list">
                    {userLogin && userLogin.isAdmin &&
                      <div>
                        <Link to="/admin/users-list" onClick={toggleDropdown}>Users</Link>
                        <Link to="/admin/products-list" onClick={toggleDropdown}>Products</Link>
                        <Link to="/admin/orders-list" onClick={toggleDropdown}>Orders</Link>
                      </div>
                    }
                    <div>
                      <Link to="/profile" onClick={toggleDropdown}>Profile</Link>
                      <Link onClick={logoutHandler} >Logout</Link>
                    </div>
                  </div>
                )}
              </div>

            ) : (
              <Link to='/login' className='navbar__cart-sign_up'>
                <i className='fas fa-user'></i> Sign In
              </Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}

export default Navigation

