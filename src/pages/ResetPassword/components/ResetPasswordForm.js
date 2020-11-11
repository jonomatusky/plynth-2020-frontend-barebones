import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from 'hooks/api-hook'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'
import { setMessage, setError } from 'redux/alertSlice'

const ResetPasswordForm = ({ token, id, onSubmit }) => {
  const dispatch = useDispatch()
  const { isLoading, sendRequest } = useApiClient()

  const handleSubmit = async (values, { resetForm }) => {
    const body = { password: values.newPassword, token, id }

    if (!isLoading) {
      try {
        await sendRequest({ url: `/auth/reset`, method: 'POST', data: body })
        resetForm()
        onSubmit(values)
        dispatch(setMessage({ message: 'Your password has been updated' }))
      } catch (err) {
        dispatch(setError({ message: err.message }))
      }
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
