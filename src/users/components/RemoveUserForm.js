import React from 'react'
import { useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { deleteUser } from '../../redux/usersSlice'
import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { TextField } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'

const UsernameForm = props => {
  const dispatch = useDispatch()
  const username = props.username
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    delete values.passwordConfirmation

    if (!isLoading) {
      try {
        if (username === values.username) {
          await sendRequest(`/users/${username}`, 'DELETE')
          dispatch(deleteUser(username))
        }

        props.onSubmit(values)
      } catch (err) {}
    }
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
