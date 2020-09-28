import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { TextField, TextArea } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const EmailForm = props => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    if (!isLoading) {
      try {
        const request = { message: { ...values, type: 'support' } }

        let response = await sendRequest(`/messages`, 'POST', request)

        resetForm({})
        props.onSubmit(values, response)
      } catch (err) {}
    }
  }

  const initialValues = {
    subject: '',
    content: '',
  }

  const validationSchema = Yup.object({
    subject: Yup.string(),
    content: Yup.string(),
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
              <TextField name="subject" label="Subject" />
            </Grid>
            <Grid item>
              <TextArea name="content" label="Message" />
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
