import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

import FormLayout from '../../layouts/FormLayout'
import MessageLayout from '../../layouts/MessageLayout'
import RecoverPasswordForm from './components/RecoverPasswordForm'

const ChangePassword = () => {
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    history.push('/')
  }

  return (
    <React.Fragment>
      {!submitted ? (
        <FormLayout
          title="Forgot Your Password?"
          message={`Enter your email below and we will send you intructions on how to reset your password.`}
        >
          <RecoverPasswordForm onSubmit={handleSubmit} />
        </FormLayout>
      ) : (
        <MessageLayout
          title="Check Your Inbox"
          message={`We've sent password reset intructions to the email provided. Please check your inbox.`}
        >
          <Button onClick={handleClose}>Back to Home</Button>
        </MessageLayout>
      )}
    </React.Fragment>
  )
}

export default ChangePassword
