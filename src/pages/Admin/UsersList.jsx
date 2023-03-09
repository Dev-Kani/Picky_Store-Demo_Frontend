import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import { deleteUser, getUsersList } from '../../redux/features/auth/admin/users/usersList'

const UsersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { usersList, isLoading, isError, message, deleteSuccess } = useSelector(
    state => state.usersList)

  const userLogin = useSelector(state => state.auth.user)

  useEffect(() => {
    if (userLogin?.isAdmin || deleteSuccess) {
      dispatch(getUsersList())
    } else {
      navigate('/login')
    }
  }, [dispatch, userLogin?.isAdmin, navigate, deleteSuccess])

  const deleteHandler = (userId) => {
    if (window.confirm(`After this confirmation, Redux will dispatch the deleteUser function, which means, a http DELETE request will be sent to backend. But I don't want you to do this right now. `)) {
      // dispatch(deleteUser(userId))
    }
  }

  return (
    <Container>
      <h3 className='text-center my-4'>Users</h3>
      {message && <h5>{message}</h5>}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Alert variant='danger'>{isError}</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <div className="text-center">
                      <i className='fas fa-check' style={{ color: 'green' }}></i>
                    </div>
                  ) : (
                    <div className="text-center">
                      <i className='fas fa-times' style={{ color: 'red' }}></i></div>
                  )}
                </td>
                <td className='d-flex justify-content-center'>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant='info' className='btn-sm m-2'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button
                    variant='danger'
                    className='btn-sm m-2'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default UsersList