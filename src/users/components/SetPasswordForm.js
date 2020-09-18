import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import MessageBar from '../../shared/components/notifications/MessageBar'

import { TextField } from '../../shared/components/forms/FormElements'

import ActionButton from '../../shared/components/ui/ActionButton'

const SetPasswordForm = props => {
  const [success, setSuccess] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    delete values.passwordConfirmation

    if (!isLoading) {
      try {
        const passwordData = { password: values }

        await sendRequest(
          `/auth/password`,
          'PATCH',
          JSON.stringify(passwordData)
        )

        resetForm()

        if (!error) {
          console.log('success!')
          setSuccess(true)
        }
      } catch (err) {}
    }
  }

  const initialValues = {
    password: '',
    newPassword: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string(),
    newPassword: Yup.string().min(
      5,
      'Password must be at least 5 characters long'
    ),
    passwordConfirmation: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  })

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <MessageBar
        open={success}
        message="Your password has been updated"
        handleClose={() => setSuccess(false)}
      />
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
                name="password"
                label="Current Password"
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField
                name="newPassword"
                label="New Password"
                type="password"
              />
            </Grid>
            <Grid item>
              <TextField
                name="passwordConfirmation"
                label="Confirm New Password"
                type="password"
              />
            </Grid>
            <Grid item>
              <ActionButton type="submit" label="Submit" loading={isLoading} />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default SetPasswordForm
