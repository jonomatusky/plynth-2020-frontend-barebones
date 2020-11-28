import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const EmailForm = props => {
  const initialValues = {
    email: '',
  }
  const { isLoading, request } = useRequest()

  const handleSubmit = async values => {
    if (!isLoading) {
      try {
        const data = { email: values.email }

        let response = await request({
          url: `/auth/recover`,
          method: 'POST',
          data,
        })

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
