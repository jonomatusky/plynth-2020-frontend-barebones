import React, { useState } from 'react'
import { Grid, Box } from '@material-ui/core'
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
    delete values.emailConfirmation

    if (!isLoading) {
      try {
        const request = { user: values }

        await sendRequest(`/auth/email`, 'PATCH', request)

        props.onSubmit(values)
      } catch (err) {}
    }
  }

  const initialValues = {
    password: '',
    email: '',
    emailConfirmation: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string(),
    email: Yup.string()
      .email('Please provide your email address')
      .required('Required'),
    emailConfirmation: Yup.string().oneOf(
      [Yup.ref('email'), null],
      'Addresses do not match'
    ),
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
              <TextField name="email" label="New Email Addresss" type="email" />
            </Grid>
            <Grid item>
              <TextField
                name="emailConfirmation"
                label="Retype New Email Addresss"
                type="email"
              />
            </Grid>
            <Box height="1rem"></Box>
            <Grid item>
              <TextField
                name="password"
                label="Confirm Your Password"
                type="password"
              />
            </Grid>
            <Box height="1.5rem"></Box>
            <Grid item>
              <ActionButton type="submit" label="Submit" loading={isLoading} />
            </Grid>
            <Box height="1rem"></Box>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default SetPasswordForm
