import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core'

import FormLayout from '../../shared/layouts/FormLayout'
import LoginForm from '../components/LoginForm'
import Background from '../../shared/layouts/Background'
import { BarRow } from '../../shared/components/ui/CardSections'

const SignUp = () => {
  const history = useHistory()

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
        <LoginForm />
      </FormLayout>
    </>
  )
}

export default SignUp
