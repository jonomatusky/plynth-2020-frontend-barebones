import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
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

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address.')
      .required('Required'),
    password: Yup.string().required('Required'),
  })

  const handleSubmit = async values => {
    try {
      const { token } = await request({
        url: '/auth/login',
        method: 'POST',
        data: values,
      })
      auth.login(token)
    } catch (err) {}
  }

  return (
    <FormLayout
      title="Log In"
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
          name="email"
          label="Email"
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
