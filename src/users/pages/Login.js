import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Link } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import LoginForm from '../components/LoginForm'
import { login } from '../../redux/authSlice'
import { BarRow } from '../../shared/components/ui/CardSections'
import { useThunkClient } from '../../shared/hooks/thunk-hook'

const SignUp = () => {
  const dispatch = useDispatch()
  const dispatchThunk = useThunkClient()
  const history = useHistory()

  const loginStatus = useSelector(state => state.auth.status)

  const handleSubmit = async values => {
    try {
      await dispatchThunk({
        thunk: login,
        inputs: values,
      })
      history.push('/admin/pieces')
    } catch (err) {}
  }

  return (
    <>
      <Background />
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
