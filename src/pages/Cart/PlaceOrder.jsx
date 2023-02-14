import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Container } from 'react-bootstrap'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import CheckoutSteps from '../../components/CheckoutSteps'
import paypalImg from '../../assets/img/paypal.svg'
import cardsImg from '../../assets/img/cards.png'
import { createOrder } from '../../redux/features/Orders/createOrder'
import { cartItemsReset } from '../../redux/features/cart/cartSlice'
import { orderDetailsReset } from '../../redux/features/Orders/order'
import './Cart.css'

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { createdOrder, isLoading, isSuccess, isError, message } = useSelector(
    state => state.createOrder)

  useEffect(() => {
    if (isSuccess) {
      dispatch(cartItemsReset())
      // dispatch(orderDetailsReset())
      navigate(`/order/${createdOrder._id}`)
    }
  }, [createdOrder._id, isSuccess, navigate, dispatch])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems.map((item, index) => {
        return {
          orderedItemName: item.cartItem.name,
          orderedItemImg: item.cartItem.image,
          orderedItemId: item.cartItem._id,
          orderedItemPrice: item.cartItem.price,
          Qty: item.eachItemQty,
        }
      }),
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      totalItems: cart.totalCartItemQty,
      shippingPrice: cart.shippingCost,
      taxPrice: cart.tax,
      totalPrice: cart.total.toFixed(2),
    }))
    dispatch(orderDetailsReset())
  }

  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <h2 className='text-center mb-4'>Place Order</h2>
      {isError && <Alert variant='danger'>{message}</Alert>}
      {isLoading && <Spinner />}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{cart.totalCartItemQty > 1 ? 'Items are shipping to' :
                'Item is shipping to'} :</h3>
              <p className='my-3'>
                <strong>Address : </strong><br />
                {cart.shippingAddress.address},<br />
                {cart.shippingAddress.postalCode},<br />
                {cart.shippingAddress.city},<br />
                {cart.shippingAddress.country}<br />
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment methods are :</h3>
              <div>
                {cart.paymentMethod === "PayPal" &&
                  <div className='payment_method_image-container'>
                    <Image src={paypalImg} alt='Paypal' />
                    <Image src={cardsImg} alt='credit or debit card' />
                  </div>}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>{cart.totalCartItemQty > 1 ? 'Ordered Items' : 'Ordered Item'} :</h3>
              {cart.cartItems.length === 0 ? (
                <h5>Your cart is empty</h5>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.cartItem.image}
                            alt={item.cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.cartItem._id}`}>
                            {`${item.cartItem.name}`} <strong>{`($${item.cartItem.price})`}</strong>
                          </Link>
                        </Col>
                        <Col md={4}>
                          <strong>{item.eachItemQty}</strong>{' '}
                          {item.eachItemQty === 1 ? 'item you ordered costs ' :
                            'items you ordered cost'} <span><strong>${item.totalItemPrice}</strong></span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='text-center'>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>{cart.totalCartItemQty === 1 ? 'Item' : 'Items'}</Col>
                  <Col>{cart.totalCartItemQty}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping cost</Col>
                  <Col>${cart.shippingCost}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col><h5>${cart.total.toFixed(2)}</h5></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn__dark btn-block btn__yellow'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container >
  )
}

export default PlaceOrder