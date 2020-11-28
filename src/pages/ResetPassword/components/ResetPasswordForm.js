import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const ResetPasswordForm = ({ token, id, onSubmit }) => {
  const { isLoading, request } = useRequest()

  const handleSubmit = async (values, { resetForm }) => {
    const body = { password: values.newPassword, token, id }

    if (!isLoading) {
      try {
        await request({ url: `/auth/reset`, method: 'POST', data: body })
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
  )
}

export default ResetPasswordForm
