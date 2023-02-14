import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { savePaymentMethod } from '../../redux/features/cart/cartSlice'

const PaymentMethod = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { shippingAddress } = useSelector((state) => state.cart)

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/place-order')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2 className='text-center'>Payment Method</h2>
      <Form onSubmit={submitHandler} className='d-flex flex-column justify-content-center align-items-center'>
        <div>
          <Form.Group>
            <Col>
              <Form.Check
                className='m-4'
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                disabled
                className='m-4'
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
        </div>
        <div>
          <Button type='submit' className='btn__dark btn__yellow' >
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethod