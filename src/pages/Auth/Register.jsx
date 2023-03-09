import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import { register, regReset } from '../../redux/features/auth/authSlice'
import Spinner from '../../components/Spinner'
import Alert from '../../components/Alert'
import FormContainer from '../../components/FormContainer'
import { Button } from 'react-bootstrap'
import './Auth.css'

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [matchPassword, setMatchPassword] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData
  const { user, isLoading, regLoading, regError, regSuccess, regMessage } = useSelector(
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
    if (password !== confirmPassword) {
      setMatchPassword(true)
      setTimeout(() => {
        setMatchPassword(false)
      }, 5000)
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }



  useEffect(() => {
    if (user) {
      navigate('/')
    }

    if (regSuccess) {
      setTimeout(() => {
        dispatch(regReset())
      }, 4000)
      setTimeout(() => { navigate('/login') }, 5000)
    }
  }, [regSuccess, user, navigate, dispatch])


  return (
    <FormContainer>
      <section className='heading'>
        <i className="fas fa-user"></i> <span>Register</span>
      </section>
      <section>
        {matchPassword && <Alert variant='danger'>Passwords do not match</Alert>}
        {regSuccess && <Alert variant='success'>{regMessage}</Alert>}
        {regError && <Alert variant='danger'>{regMessage}</Alert>}
      </section>

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
          <div className='form-group login'>
            <Button type='submit' className='btn__dark btn-block'>
              Submit
            </Button>
            <p className='switch-text'>Already a member?</p>
            <Button
              variant='outline-dark'
              onClick={() => navigate('/login')}
            >
              Switch to Login
            </Button>
          </div>
        </form>
      </section>
    </FormContainer>
  )
}

export default Register
