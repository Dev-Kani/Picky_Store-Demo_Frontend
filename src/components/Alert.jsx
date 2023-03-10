import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  return <Alert variant={variant} className='my-4'>{children}</Alert>
}

Message.defaultProps = {
  variant: 'danger'
}

export default Message