import React, { useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import MessageBar from 'components/MessageBar'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const SetPasswordForm = ({ onSubmit, isLoading }) => {
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values, { resetForm }) => {
    onSubmit(values, resetForm)
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
    <React.Fragment>
      <MessageBar
        open={success}
        message="Your password has been updated"
        handleClose={() => setSuccess(false)}
      />
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
    </React.Fragment>
  )
}

export default SetPasswordForm
