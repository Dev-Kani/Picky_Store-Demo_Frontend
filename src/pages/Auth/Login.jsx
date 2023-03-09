import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import FormContainer from '../../components/FormContainer'
import { login, reset } from '../../redux/features/auth/authSlice'
import { Button } from 'react-bootstrap'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [tempError, setTempError] = useState(true)

  const [formData, setFormData] = useState({
    email: 'admin@picky.com',
    password: 'admin@picky.com',
  })

  const { email, password } = formData

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isLoading) {
      return <Spinner />
    }
    if (user) {
      navigate('/cart')
    }
    if (isError) {
      setTimeout(() => {
        setTempError(false)
        dispatch(reset())
      }, 4000)
      setTimeout(() => {
        setTempError(true)
      }, 5000)
    }

  }, [user, navigate, isError, dispatch, reset])


  return (
    <FormContainer>
      <section className='heading'>
        <i className="fas fa-sign-in-alt"></i><span> Login </span>
      </section>
      <section>
        {isSuccess && <Alert variant='success'>{message}</Alert>}
        {tempError && isError && <Alert variant='danger'>{message}</Alert>}
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
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

          <div className='form-group login'>
            <Button type='submit' className='btn__dark btn-block'>
              Login
            </Button>
            <p className='switch-text mb-3'>Don't have an account yet?</p>
            <div>
              <Button
                variant='outline-dark'
                onClick={() => navigate('/register')}
              >
                Switch to Sign up
              </Button>
            </div>

          </div>
        </form>
      </section>
    </FormContainer>
  )
}

export default Login
