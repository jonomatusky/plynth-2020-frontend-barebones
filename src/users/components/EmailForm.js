import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

import { TextField } from '../../shared/components/forms/FormElements'

import ActionButton from '../../shared/components/ui/ActionButton'

const EmailForm = props => {
  const [initialValues, setInitialValues] = useState({
    email: '',
  })
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    if (!isLoading) {
      try {
        const request = { user: values }

        let response = await sendRequest(
          `/auth/email`,
          'PATCH',
          JSON.stringify(request)
        )

        console.log('success!')
        props.onSubmit(values, response)
      } catch (err) {}
    }
  }

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const responseData = await sendRequest(`/users/me`)
        const { email } = responseData.user
        setInitialValues({
          email,
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchEmail()
  }, [sendRequest])

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
