import React from 'react'

import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from '../../shared/components/forms/FormElements'

import ActionButton from '../../shared/components/ui/ActionButton'

console.log('rerendering')

const SignInForm = ({ onSubmit, isLoading }) => {
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please provide your email address.')
      .required('Required'),
    password: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              name="email"
              label="Email"
              type="text"
              autocapitalize="none"
              autocorrect="off"
            />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              label="Password"
              type="password"
              autocapitalize="none"
              autocorrect="off"
            />
          </Grid>
          <Box height="1.5rem"></Box>
          <Grid item>
            <ActionButton
              type="submit"
              label="Submit"
              loading={isLoading}
              disableRipple={isLoading}
            />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

export default SignInForm
