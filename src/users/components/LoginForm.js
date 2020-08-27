import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from '../../shared/components/FormElements/FormElements'

import ActionButton from '../../shared/components/UIElements/ActionButton'

const SignInForm = props => {
  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Please provide your email address.'),
    password: Yup.string(),
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
          <Grid item>
            <ActionButton type="submit" label="Submit" />
          </Grid>
          <Box height="2vh"></Box>
        </Grid>
      </Form>
    </Formik>
  )
}

export default SignInForm
