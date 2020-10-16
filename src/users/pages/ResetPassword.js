import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'

import { logout } from '../../redux/authSlice'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import MessageLayout from '../../shared/layouts/MessageLayout'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const { token, userId } = useParams()
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleClose = () => {
    history.push('/s/login')
  }

  useEffect(() => {
    if (!token) {
      history.push('/')
    }
  })

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <React.Fragment>
      <Background />
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
