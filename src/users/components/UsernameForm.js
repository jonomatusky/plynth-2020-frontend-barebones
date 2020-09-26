import React, { useContext } from 'react'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import { AuthContext } from '../../shared/context/auth-context'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { TextField } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const UsernameForm = props => {
  const auth = useContext(AuthContext)

  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const { username } = props.user

  const handleSubmit = async (values, { resetForm }) => {
    delete values.passwordConfirmation

    if (!isLoading) {
      try {
        const userData = { user: values }

        const response = await sendRequest(`/users/me`, 'PATCH', userData)

        console.log('success!')
        auth.updateUser(response.user)
        props.onSubmit(values)
      } catch (err) {}
    }
  }

  const initialValues = {
    username: username || '',
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must be no longer than 30 characters')
      .matches(
        /^[a-z0-9_.]*$/,
        'Username must only contain lowercase characters a-z, numbers, . and _'
      )
      .matches(
        /^(?!.*?\.\.).*?$/,
        'Username cannot contain two consecutive (.)'
      )
      .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
      .required('Required'),
  })

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />

      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField name="username" label="Username" />
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
