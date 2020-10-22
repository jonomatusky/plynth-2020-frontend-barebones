import React, { useState } from 'react'

import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import MessageBar from '../../shared/components/notifications/MessageBar'
import { TextField } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const ResetPasswordForm = ({ token, id, onSubmit }) => {
  const [success, setSuccess] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    const body = { password: values.newPassword, token, id }

    if (!isLoading) {
      try {
        await sendRequest({ url: `/auth/reset`, method: 'POST', data: body })

        resetForm()
        onSubmit(values)
      } catch (err) {}
    }
  }

  const initialValues = {
    newPassword: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
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
            <Box height="1rem" />
            <Grid item>
              <ActionButton type="submit" label="Submit" loading={isLoading} />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default ResetPasswordForm
