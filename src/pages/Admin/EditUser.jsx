import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../components/Alert'
import Spinner from '../../components/Spinner'
import FormContainer from '../../components/FormContainer'
import { Link } from 'react-router-dom'
import { getUserDetails } from '../../redux/features/auth/userProfile'
import { doEditUser } from '../../redux/features/auth/admin/editUser'

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
    dispatch(doEditUser({
      _id: userId, name, email, isAdmin

    }))
  }

  return (
    <>
      <Link to='/admin/users-list' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
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
              <div className=''>
                <input
                  type='checkbox'
                  className=''
                  id='IsAdmin'
                  name='isAdmin'
                  checked={isAdmin}
                  // placeholder='Enter password'
                  onChange={onChange}
                />
                <label htmlFor="IsAdmin"> Is Admin?</label><br></br>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-block'>
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
