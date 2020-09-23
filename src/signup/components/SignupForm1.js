import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../shared/context/auth-context'
import { useApiClient } from '../../shared/hooks/api-hook'

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
})

const SignupForm1 = ({ values }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    delete values.passwordConfirmation

    try {
      const userData = { user: values }
      const response = await sendRequest(
        `/auth/signup`,
        'POST',
        JSON.stringify(userData)
      )

      auth.login(response.user, response.token)
    } catch (err) {}

    // if (!error) {
    //   history.push('/s/signup/name')
    // }
  }

  const handleCancel = () => {
    history.push('/admin/profile')
  }

  return (
    <>
      <FormLayout title={title}>
        <BarRow onClick={handleCancel} buttonLabel={'Cancel X'} />
        <Grid item>
          <ErrorBar open={!!error} error={error} handleClose={clearError} />
          <Grid container justify="center">
            <Grid item xs={11}>
              <Formik
                enableReinitialize="true"
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <Grid container direction="column" spacing={1}>
                      <Box height="1rem"></Box>
                      <Grid item>
                        <TextField name="email" label="Email" type="email" />
                      </Grid>
                      <Grid item>
                        <TextField name="username" label="Username" />
                      </Grid>
                      <Grid item>
                        <TextField
                          name="password"
                          label="Password"
                          type="password"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          name="passwordConfirmation"
                          label="Confirm Password"
                          type="password"
                        />
                      </Grid>
                      <Box height="4vh"></Box>
                      <Grid item>
                        <ActionButton
                          type="submit"
                          label="Save"
                          loading={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </FormLayout>
    </>
  )
}

export default SignupForm1