import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const SetPasswordForm = ({ onSubmit, isLoading }) => {
  const handleSubmit = async (values, actions) => {
    onSubmit(values, actions)
  }

  const initialValues = {
    password: '',
    newPassword: '',
    passwordConfirmation: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('Required'),
    newPassword: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Required'),
  })

  return (
    <>
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
                name="password"
                label="Current Password"
                type="password"
              />
            </Grid>
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
    </>
  )
}

export default SetPasswordForm
