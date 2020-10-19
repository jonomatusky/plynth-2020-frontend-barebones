import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Link } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import FormLayout from '../../shared/layouts/FormLayout'
import LoginForm from '../components/LoginForm'
import { login, clearError } from '../../redux/authSlice'
import { BarRow } from '../../shared/components/ui/CardSections'

const SignUp = () => {
  // const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const history = useHistory()

  const loginStatus = useSelector(state => state.auth.status)
  const loginError = useSelector(state => state.auth.error)

  const handleSubmit = async values => {
    const { email, password } = values
    if (loginStatus === 'idle') {
      console.log('logging in')
      try {
        dispatch(login({ email, password }))
        // history.push('/admin/pieces')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <Background />
      <ErrorBar
        open={!!loginError}
        error={loginError}
        handleClose={() => dispatch(clearError())}
      />
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
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={loginStatus === 'loading'}
        />
      </FormLayout>
    </>
  )
}

export default SignUp
