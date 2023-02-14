import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { getAllOrders } from '../../redux/features/auth/admin/orders/ordersList'

const OrdersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { ordersList, isLoading, isError, message } = useSelector(
    state => state.ordersList)

  const userLogin = useSelector((state) => state.auth.user)

  useEffect(() => {
    if (userLogin?.isAdmin) {
      dispatch(getAllOrders())
    } else {
      navigate('/login')
    }
  }, [userLogin, dispatch, navigate])

  return (
    <Container>
      <h3 className='text-center my-3'>Orders</h3>
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Alert variant='danger'>{message}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    moment(order.paidAt).format('YYYY-MM-DD, h:mm:ss A')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    moment(order.deliveredAt).format('YYYY-MM-DD, h:mm:ss A')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <Button variant='info' className='btn-sm'>Details</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default OrdersList