import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { getUserDetails } from '../../redux/features/auth/userProfile'
import { doEditUser } from '../../redux/features/auth/admin/users/editUser'

function EditUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userId } = useParams()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
  })

  const { name, email, isAdmin } = formData
  const { user: userData } = useSelector(state => state.userDetails
  )
  const {
    isSuccess,
    isError,
    message,
    isLoading,
    updateSuccess
  } = useSelector((state) => state.updateUser)

  useEffect(() => {
    // dispatch(updateUserReset())
    // navigate('/admin/users-list')
    if (!userData.name || userData._id !== userId || isSuccess) {
      dispatch(getUserDetails(userId))
    } else {
      setFormData({
        name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin,
      })
    }
    // useEffect(() => {
    //   if (isSuccess) {
    //     dispatch(updateUserReset())
    //     navigate('/admin/users-list')
    //   } else {
    //     if (!userData.name || userData._id !== userId) {
    //       dispatch(getUserDetails(userId))
    //     } else {
    //       setFormData({
    //         name: userData.name,
    //         email: userData.email,
    //         isAdmin: userData.isAdmin,
    //       })
    //     }
    //   }

  }, [isSuccess, userData.name, userData.email, userData.isAdmin,
    userData._id, userId, dispatch, navigate])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // temporary alert
    if (window.confirm(`As an Admin, you can modify, delete or update users' (customers) details. When this EditUser component loads, Redux dispatch getUserDetails function to get user's details and then populate the form inputs with those details. After clicking Update button, Redux will dispatch the doEditUser function to sent http PUT request to backend for update user details. Let's not do that right now. ok?`))
      dispatch(doEditUser({
        // _id: userId, name, email, isAdmin
      })
      )
  }

  return (
    <>
      <FormContainer>
        <Link to='/admin/users-list' className='btn btn-light my-3'>Go Back</Link>
        <section className='heading'>
          <i className="fas fa-user"></i> <span> Edit User</span>
        </section>
        {updateSuccess && <Alert variant='success'>{message}</Alert>}
        {isLoading ? <Spinner /> : isError ?
          <Alert variant='danger'>{message}</Alert> :
          <section className='form'>
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
              <div className='my-3'>
                <input
                  type='checkbox'
                  className=''
                  id='IsAdmin'
                  name='isAdmin'
                  checked={isAdmin}
                  // placeholder='Enter password'
                  onChange={onChange}
                /> {`  `}
                <label htmlFor="IsAdmin"> Is Admin?</label><br />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn__dark btn-block'>
                  Update
                </button>
              </div>
            </form>
          </section>}
      </FormContainer>
    </>
  )
}

export default EditUser
