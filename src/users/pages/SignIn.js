import React, { useContext } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import LoginForm from '../components/SignInForm'
import { BarRow } from '../../shared/components/ui/CardSections'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const history = useHistory()

  const handleSubmit = async values => {
    try {
      const { token } = await sendRequest({
        url: '/auth/login',
        method: 'POST',
        data: values,
      })
      auth.login(token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Background />
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <FormLayout
        title="Log In"
        bar={
          <BarRow
            onClick={() => {
              history.push('/')
            }}
            buttonLabel={'Cancel X'}
          />
        }
        below={
          <Typography>
            {`Forgot your password? `}
            <Link
              component={RouterLink}
              to="/s/recover"
              color="inherit"
              underline="always"
            >
              Click here
            </Link>
          </Typography>
        }
      >
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </FormLayout>
    </>
  )
}

export default SignIn
