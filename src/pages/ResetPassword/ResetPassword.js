import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

import { AuthContext } from 'contexts/auth-context'
import FormLayout from 'layouts/FormLayout'
import MessageLayout from 'layouts/MessageLayout'
import ResetPasswordForm from './components/ResetPasswordForm'

const ChangePassword = () => {
  const auth = useContext(AuthContext)
  const { token, userId } = useParams()
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    history.push('/admin/login')
  }

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  })

  useEffect(() => {
    auth.logout()
  })

  return (
    <React.Fragment>
      {!submitted ? (
        <FormLayout
          title="Reset Password"
          message={`Enter your new password below.`}
          onClose={handleClose}
        >
          <ResetPasswordForm
            onSubmit={handleSubmit}
            token={token}
            id={userId}
          />
        </FormLayout>
      ) : (
        <MessageLayout
          title="Success"
          message={`Your password has been reset. Please log in.`}
        >
          <Button onClick={handleClose}>Log In</Button>
        </MessageLayout>
      )}
    </React.Fragment>
  )
}

export default ChangePassword
