import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useAuth } from '../../shared/hooks/auth-hook'
import { useApiClient } from '../../shared/hooks/api-hook'

import Background from '../../shared/layouts/Background'
import FormLayout from '../../shared/layouts/FormLayout'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import ActionButton from '../../shared/components/ui/ActionButton'
import { BarRow } from '../../shared/components/ui/CardSections'
import { TextField } from '../../shared/components/forms/FormElements'

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
  const { login } = useAuth
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    try {
      let { email, username, password, signupKey } = values
      let userData = { user: { email, username, password, signupKey } }
      const { user, token } = await sendRequest(
        `/auth/signup`,
        'POST',
        userData
      )

      dispatch(login({ user, token }))
      history.push('/admin/get-started/profile')
    } catch (err) {}
  }

  return (
    <>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
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
        <Formik
          enableReinitialize="true"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <TextField name="email" label="Email" type="email" />
                </Grid>
                <Grid item>
                  <TextField
                    name="username"
                    label={`Username (plynth.com/${
                      values.username || 'username'
                    })`}
                    autoCorrect="off"
                    autoCapitalize="none"
                  />
                </Grid>
                <Box height="1rem"></Box>
                <Grid item>
                  <TextField name="password" label="Password" type="password" />
                </Grid>
                <Grid item>
                  <TextField
                    name="passwordConfirmation"
                    label="Confirm Password"
                    type="password"
                  />
                </Grid>
                <Box height="1rem"></Box>
                <Grid item>
                  <TextField
                    name="signupKey"
                    label="Access Code"
                    autoCorrect="off"
                    autoCapitalize="none"
                  />
                </Grid>
                <Box height="1.5rem"></Box>
                <Grid item>
                  <ActionButton
                    type="submit"
                    label="Create Account"
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </FormLayout>
    </>
  )
}

export default UserSignup1
