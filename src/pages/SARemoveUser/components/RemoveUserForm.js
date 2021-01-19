import React from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'

const UsernameForm = ({ username, onSubmit, isLoading }) => {
  const handleSubmit = async values => {
    onSubmit(values)
  }

  const initialValues = {
    username: '',
  }

  const validationSchema = Yup.object({
    username: Yup.string().oneOf(
      [username, null],
      `Please type the user's username to confirm`
    ),
  })

  return (
    <React.Fragment>
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                name="username"
                label={
                  <>
                    Type <strong>{username}</strong> to confirm
                  </>
                }
              />
            </Grid>
            <Grid item>
              <ActionButton type="submit" label="Submit" loading={isLoading} />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </React.Fragment>
  )
}

export default UsernameForm
