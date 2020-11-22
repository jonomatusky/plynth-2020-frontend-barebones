import React, { useContext } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography, Link } from '@material-ui/core'

import { AuthContext } from 'contexts/auth-context'
import { useApiClient } from 'hooks/api-hook'
import { setError } from 'redux/alertSlice'
import FormLayout from 'layouts/FormLayout'
import { BarRow } from 'components/CardSections'
import LoginForm from './components/SignInForm'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const { isLoading, sendRequest } = useApiClient()
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
      dispatch(setError({ message: err.message }))
    }
  }

  return (
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
            to="/admin/recover"
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
  )
}

export default SignIn
