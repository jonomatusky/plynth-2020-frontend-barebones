import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Box } from '@material-ui/core'
import * as Yup from 'yup'

import { AuthContext } from 'contexts/auth-context'
import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import { BarRow } from 'components/CardSections'
import { TextField } from 'components/FormElements'
import SimpleForm from 'components/SimpleForm'

const title = 'Create an Account'

const initialValues = {
  email: '',
  username: '',
  password: '',
  passwordConfirmation: '',
  signupKey: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please provide your email address')
    .required('Required'),
  username: Yup.string()
    .min(6, 'Username must be at least 6 characters long')
    .max(30, 'Username must be no longer than 30 characters')
    .matches(
      /^[a-z0-9_.]*$/,
      'Username must only contain lowercase characters a-z, numbers, . and _'
    )
    .matches(/^(?!.*?\.\.).*?$/, 'Username cannot contain two consecutive (.)')
    .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  signupKey: Yup.string().required('Required'),
})

const UserSignup1 = ({ values }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { status, request } = useRequest()

  const handleSubmit = async values => {
    try {
      let { email, username, password, signupKey } = values
      let userData = { user: { email, username, password, signupKey } }
      const { token } = await request({
        url: `/auth/signup`,
        method: 'POST',
        data: userData,
      })

      auth.login(token)
      history.push('/admin/get-started/profile')
    } catch (err) {}
  }

  return (
    <FormLayout
      title={title}
      bar={
        <BarRow
          buttonLabel="Cancel X"
          onClick={() => {
            history.push('/')
          }}
        />
      }
    >
      <SimpleForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        status={status}
      >
        <TextField name="email" label="Email" type="email" />
        <TextField
          name="username"
          label={`Username (plynth.com/${values.username || 'username'})`}
          autoCorrect="off"
          autoCapitalize="none"
        />
        <Box height="1rem"></Box>
        <TextField name="password" label="Password" type="password" />
        <TextField
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
        />
        <Box height="1rem"></Box>
        <TextField
          name="signupKey"
          label="Access Code"
          autoCorrect="off"
          autoCapitalize="none"
        />
      </SimpleForm>
    </FormLayout>
  )
}

export default UserSignup1
