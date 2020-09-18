import React, { useState, useContext } from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from '../../shared/components/forms/FormElements'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { useApiClient } from '../../shared/hooks/api-hook'

import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'

import ActionButton from '../../shared/components/ui/ActionButton'

const SignInForm = props => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    if (!isLoading) {
      try {
        const responseData = await sendRequest(
          '/auth/login',
          'POST',
          JSON.stringify({
            user: values,
          })
        )

        auth.login(responseData.user, responseData.token)
        history.push('/admin/pieces')
      } catch (err) {
        console.log(err)
      }
    }
  }

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

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <TextField
                name="email"
                label="Email"
                type="text"
                autocapitalize="none"
                autocorrect="off"
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                label="Password"
                type="password"
                autocapitalize="none"
                autocorrect="off"
              />
            </Grid>
            <Grid item>
              <ActionButton
                type="submit"
                label="Submit"
                loading={isLoading}
                disableRipple={isLoading}
              />
            </Grid>
            <Box height="2vh"></Box>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default SignInForm
