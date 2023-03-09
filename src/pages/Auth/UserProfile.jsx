import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import moment from 'moment'
import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import FormContainer from '../../components/FormContainer'
import { getMyOrder } from '../../redux/features/Orders/myOrders'
import { getUserDetails } from '../../redux/features/auth/userProfile'
import { updateUserDetails, userUpdateReset } from '../../redux/features/auth/userUpdate'
import './Auth.css'
import Footer from '../../components/Footer/Footer'

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [matchPassword, setMatchPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const userLogin = useSelector(state => state.auth.user)

  const { user, isLoading, isError, message } = useSelector(
    state => state.userDetails
  )

  const { isSuccess } = useSelector(
    state => state.updateUserDetails
  )

  const {
    myOrders: myOrdersList,
    isLoading: loadingOrders,
    // isSuccess: myOrdersSucess,
    isError: myOrdersError,
    message: myOrdersMessage
  } = useSelector(state => state.myOrders)

  const { name, email, password, confirmPassword } = formData

  useEffect(() => {
    if (userLogin === null) {
      navigate('/login')
    } else {
      if (!user?.name) {
        dispatch(getUserDetails('profile'))
        dispatch(getMyOrder())
      } else {
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
          confirmPassword: '',
        })
      }
    }
  }, [user, navigate, dispatch, userLogin])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMatchPassword(true)
      setTimeout(() => {
        setMatchPassword(false)
      }, 5000)
    } else {
      // temporary alert
      if (window.confirm(`As an Admin, you can modify, delete or update users' (customers) details and your own. When this UserProfile component loads, Redux dispatch getUserDetails function to get user's details and then populate the form inputs with fetched details. After clicking Update button, Redux will dispatch the updateUserDetails function to sent http PUT request to update user details. Let's not do that for now, ok?`)) {
        // dispatch(updateUserDetails({ id: user._id, name, email, password }))
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (isSuccess) {
    setTimeout(() => {
      dispatch(userUpdateReset())
    }, 3000)
  }

  return (
    <>
      <Container>
        <Row className='mb-4'>
          <section className='heading'>
            <i className="fas fa-user"></i> <h2>User Profile</h2>
          </section>
          <Col sm={12} className='form'>
            <FormContainer>
              {matchPassword && <Alert variant='danger'>Passwords do not match</Alert>}
              {isError && <Alert variant='danger'>{message}</Alert>}
              {isSuccess && <Alert variant='success'>User Details Updated</Alert>}
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    placeholder='Enter your name'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    placeholder='Enter your email'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter password'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={confirmPassword}
                    placeholder='Confirm password'
                    onChange={onChange}
                  />
                </div>
                <div className='form-group'>
                  <Button type='submit' className='btn__dark btn-block'>
                    Update
                  </Button>
                </div>
              </form>
            </FormContainer>
          </Col>
          <Col sm={12}>
            <h2 className='text-center pb-3'>My orders</h2>
            {loadingOrders ? (
              <Spinner />
            ) : myOrdersError ? (
              <Alert variant='danger'>{myOrdersMessage}</Alert>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL ($)</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrdersList.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td className="text-center">
                        {order.isPaid ? (
                          moment(order.paidAt).format('YYYY-MM-DD, h:mm:ss A')
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td className="text-center">
                        {order.isDelivered ? (
                          moment(order.deliveredAt).format('YYYY-MM-DD, h:mm:ss A')
                        ) : (
                          <i className='fas fa-times ' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      <td className='d-flex align-items-center justify-content-center'>
                        <div>
                          <Link to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='info'>
                              Details
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default UserProfile
