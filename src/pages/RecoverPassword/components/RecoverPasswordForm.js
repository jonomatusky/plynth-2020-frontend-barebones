import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from 'hooks/api-hook'
import { setError } from 'redux/alertSlice'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const EmailForm = props => {
  const dispatch = useDispatch()
  const initialValues = {
    email: '',
  }
  const { isLoading, sendRequest } = useApiClient()

  const handleSubmit = async values => {
    if (!isLoading) {
      try {
        const request = { email: values.email }

        let response = await sendRequest({
          url: `/auth/recover`,
          method: 'POST',
          data: request,
        })

        props.onSubmit(values, response)
      } catch (err) {
        dispatch(setError({ message: err.message }))
      }
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address')
      .required('Required'),
  })

  return (
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
  )
}

export default EmailForm
