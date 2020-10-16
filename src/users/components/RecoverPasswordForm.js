import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { TextField } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const EmailForm = props => {
  const initialValues = {
    email: '',
  }
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    if (!isLoading) {
      try {
        const request = { email: values.email }

        let response = await sendRequest(`/auth/recover`, 'POST', request)

        props.onSubmit(values, response)
      } catch (err) {}
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address')
      .required('Required'),
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
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField name="email" label="Email" type="email" />
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

export default EmailForm
