import React, { useContext } from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { Typography, Link } from '@material-ui/core'
import * as Yup from 'yup'

import { AuthContext } from 'contexts/auth-context'
import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import { TextField } from 'components/FormElements'
import SimpleForm from 'components/SimpleForm'

const SignIn = () => {
  const auth = useContext(AuthContext)
  const { status, request } = useRequest()
  const history = useHistory()
  const location = useLocation()

  const initialValues = {
    emailOrUsername: '',
    password: '',
  }

  const validationSchema = Yup.object({
    emailOrUsername: Yup.string().required(
      'Please provide your email or username.'
    ),
    password: Yup.string().required('Please enter your password to log in.'),
  })

  const handleSubmit = async values => {
    values.emailOrUsername = values.emailOrUsername.toLowerCase()

    try {
      const { token } = await request({
        url: '/auth/login',
        method: 'POST',
        data: values,
      })
      auth.login(token)
      history.push('/admin/profile')
    } catch (err) {}
  }

  return (
    <FormLayout
      title="Log In"
      onClose={() =>
        (location.state || {}).referrer
          ? history.push(location.state.referrer)
          : history.push('/')
      }
      buttonLabel={'Cancel X'}
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
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        status={status}
      >
        <TextField
          name="emailOrUsername"
          label="Username or Email"
          type="text"
          autocapitalize="none"
          autocorrect="off"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          autocapitalize="none"
          autocorrect="off"
        />
      </SimpleForm>
    </FormLayout>
  )
}

export default SignIn
