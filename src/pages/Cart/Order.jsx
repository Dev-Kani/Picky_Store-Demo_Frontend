import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { getOrderDetails } from '../../redux/features/orders/order'
import { cartItemsReset } from '../../redux/features/cart/cartSlice'
import { makeOrderDelivered } from '../../redux/features/auth/admin/orders/orderDeliver'
import { orderPayReset } from '../../redux/features/orders/orderPay'
import PaypalCheckout from '../../components/Checkout/PaypalCheckout'

const Order = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { orderId } = useParams()

  const [thanks, setThanks] = useState(false)

  const userLogin = useSelector(state => state.auth.user)
  const orderDetails = useSelector(state => state.orderDetails)

  const {
    orderItemDetails,
    isLoading,
    isError,
    message,
    isSuccess,
  } = orderDetails
  const {
    _id, user,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt,
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
    totalItems
  } = orderItemDetails

  const {
    isLoading: orderPayLoading,
    isError: orderPayError,
    isSuccess: orderPaySuccess,
    message: orderPayMessage,
  } = useSelector(state => state.orderPay)

  const {
    isLoading: deliverLoading,
    // isError: deliverError,
    isSuccess: deliverSuccess,
    // message: deliverMessage,
  } = useSelector(state => state.orderDeliver)


  const refreshPage = () => {
    window.location.reload()
  }


  useEffect(() => {
    if (userLogin !== null) {
      dispatch(getOrderDetails(orderId))
    } else {
      navigate('/login')
    }

    // dispatch(createdOrderReset())
    // dispatch(orderPayReset())
    // dispatch(orderDeliverReset())

    if (!isSuccess || orderPaySuccess) {
      dispatch(orderPayReset())
      // dispatch(getOrderDetails(orderId))
      // dispatch(createdOrderReset())
      dispatch(cartItemsReset())
    }

    if (orderPaySuccess) {
      setTimeout(() => {
        // setThanks(true)
        // navigate('/profile')
        refreshPage()
      }, 5000)

      setThanks(true)
    } else if (deliverSuccess) {
      setTimeout(() => {
        // navigate('/admin/orders-list')
        // refreshPage()
      }, 5000)
    }

  }, [orderId, orderPaySuccess, isSuccess, isPaid, deliverSuccess, userLogin, dispatch])


  const deliverHandler = () => {
    dispatch(makeOrderDelivered(orderItemDetails))
  }

  return (
    <Container>
      {isLoading && <Spinner />}
      {isError && <Alert variant='danger'></Alert>}
      {isError && <Alert variant='danger'>Something went wrong<br />{message}</Alert>}
      {isSuccess && <>
        <h5 className='mt-3'>Order Id : {_id}</h5>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  <strong>Name : </strong> {user.name}
                </p>
                <p>
                  <strong>Email : </strong>{' '}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
                <p>
                  <strong>Address : </strong> <br />
                  {shippingAddress.address}, <br />
                  {shippingAddress.postalCode}, <br />
                  {shippingAddress.city} <br />
                  {shippingAddress.country}
                </p>
                {isDelivered ? (
                  <Alert variant='success'>{`Delivered on :
                    ${moment(deliveredAt).format('YYYY-MM-DD, h:mm:ss A')}`}
                  </Alert>
                ) : (
                  <Alert variant='danger'>Not Delivered</Alert>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {paymentMethod}
                </p>
                {isPaid ? (
                  <Alert variant='success'>{`Paid on : 
                  ${moment(paidAt).format('YYYY-MM-DD, h:mm:ss A')}`}</Alert>
                  // <Alert variant='success'>Paid on (time)</Alert>
                ) : (
                  <Alert variant='danger'>Not Paid</Alert>
                )}
                {thanks && <Alert variant='success'>
                  Thanks for your purchase! Enjoy your new item.</Alert>}
                {orderPayError && <Alert variant='danger'>{orderPayMessage}</Alert>}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Ordered Items</h3>
                {orderItems.length === 0 ? (
                  <h6>Order is empty</h6>
                ) : (
                  <ListGroup variant='flush'>
                    {orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.orderedItemImg}
                              alt={item.orderedItem}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.orderedItemId}`}>
                              {item.orderedItemName} <strong>(${item.orderedItemPrice})</strong>
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.Qty > 1 ? `(${item.Qty}) items ordered` : `(${item.Qty}) item ordered`}
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
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{totalItems}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col><strong>${totalPrice.toFixed(2)}</strong></Col>
                  </Row>
                </ListGroup.Item >

                {/* Paypal checkout process */}

                <ListGroup.Item>
                  {orderPayLoading && <Spinner />}
                  {!isPaid && (
                    <PaypalCheckout
                      totalPrice={totalPrice}
                      orderId={orderId}
                    />
                  )}
                </ListGroup.Item>


                {deliverLoading && <Spinner />}
                {userLogin?.isAdmin && isPaid && !isDelivered && (
                  <ListGroup.Item>
                    <Button
                      variant='success'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>}
    </Container>
  )
}

export default Order

