import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from 'hooks/api-hook'
import { setError } from 'redux/alertSlice'
import { TextField, TextArea } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const EmailForm = props => {
  const dispatch = useDispatch()
  const { isLoading, sendRequest } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    if (!isLoading) {
      try {
        const request = { message: { ...values, type: 'support' } }

        let response = await sendRequest({
          url: `/messages`,
          method: 'POST',
          data: request,
        })

        resetForm({})
        props.onSubmit(values, response)
      } catch (err) {
        dispatch(setError({ message: err.message }))
      }
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
  )
}

export default EmailForm
