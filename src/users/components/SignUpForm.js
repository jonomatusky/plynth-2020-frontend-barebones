import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from '../../shared/components/FormElements/FormElements'

import ActionButton from '../../shared/components/UIElements/ActionButton'

const SignInForm = props => {
  const initialValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
    signupKey: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Please provide your email address.'),
    password: Yup.string().min(
      5,
      'Password must be at least 5 characters long'
    ),
    passwordConfirmation: Yup.string()
      .min(5, 'Password must be at least 5 characters long')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    signupKey: Yup.string(),
  })

  return (
    <Formik
      enableReinitialize="true"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
    >
      <Form>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField name="email" label="Email" type="text" />
          </Grid>
          <Grid item>
            <TextField name="password" label="Password" type="password" />
          </Grid>
          <Grid item>
            <TextField
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField name="signupKey" label="Access Code" />
          </Grid>
          <Grid item>
            <ActionButton type="submit" label="Submit" />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  )
}

export default SignInForm
