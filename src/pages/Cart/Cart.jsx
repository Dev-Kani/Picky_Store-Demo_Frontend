import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card, Container } from 'react-bootstrap'
import { incrementItemQty, decrementItemQty, removeCartItems } from '../../redux/features/cart/cartSlice'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems, totalCartItemQty, total } = useSelector((state) => state.cart)
  const isLoggedIn = useSelector(state => state.auth.user)

  const checkoutHandler = () => {
    if (isLoggedIn) {
      navigate('/shipping')
    } else {
      navigate("/login?redirect=shipping")
    }
  }

  return (
    <Container>
      {cartItems.length === 0 && <div className='mt-5 text-center d-flex flex-column align-items-center'>
        <h2>Shopping Cart</h2>
        <p className='my-3'>Your cart is empty </p>
        <Link to='/' className='btn btn__dark mt-2' style={{ width: '200px' }}>Go Shopping</Link>
      </div>}
      {cartItems.length > 0 &&
        <Row className='py-4 d-flex flex-column align-items-center flex-md-row'>
          <h2>Shopping Cart</h2>
          <Col md={8}>
            <ListGroup variant='flush'>
              {cartItems.map((item, index) => (
                <ListGroup.Item key={item.cartItem._id}>
                  <Row className='mb-md-3 d-flex ju'>
                    <Col md={2}>
                      <Image src={item.cartItem.image} alt={item.cartItem.name} fluid rounded />
                    </Col>
                    <Col md={6}>
                      <Link
                        to={`/product/${item.cartItem._id}`}
                      >{item.cartItem.name}</Link>{`  `}
                      <strong>(${`${item.cartItem.price.toFixed(2)}`})</strong>
                    </Col>
                    <Col md={4} className='d-flex align-items-start justify-content-between btn__idd'>
                      <div className='qty'>
                        <button onClick={() => dispatch(decrementItemQty({ _id: item.cartItem._id }))}>－</button>
                        <span>{item.eachItemQty}</span>
                        <button onClick={() => dispatch(incrementItemQty({ _id: item.cartItem._id }))}>＋</button>
                      </div>
                      <div>
                        <Button
                          variant='outline-danger'
                          className=''
                          onClick={() => dispatch(removeCartItems({ _id: item.cartItem._id }))}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

          </Col>
          {cartItems.length !== 0 &&
            <Col md={4}>
              <Card className='mt-4'>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>Subtotal ({totalCartItemQty} items)</h3>
                    <h6 className='my-3'>Total : ${total.toFixed(2)}</h6>
                    <p>(tax & shipping cost included)</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn__dark btn-block btn__yellow'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          }
        </Row>
      }
    </Container>
  )
}

export default Cart