import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import { TextField, TextArea } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const EmailForm = props => {
  const { isLoading, request } = useRequest()

  const handleSubmit = async (values, { resetForm }) => {
    if (!isLoading) {
      try {
        const data = { message: { ...values, type: 'support' } }

        let response = await request({
          url: `/messages`,
          method: 'POST',
          data,
        })

        resetForm()
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
