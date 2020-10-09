import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useApiClient } from '../../shared/hooks/api-hook'
import { login } from '../../redux/authSlice'
import { TextField } from '../../shared/components/forms/FormElements'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

// import { AuthContext } from '../../shared/context/auth-context'

import ActionButton from '../../shared/components/ui/ActionButton'

const SignInForm = props => {
  // const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  const handleSubmit = async values => {
    if (!isLoading) {
      try {
        const { user, token } = await sendRequest('/auth/login', 'POST', {
          user: values,
        })

        console.log(user)
        console.log(token)

        dispatch(login({ user, token }))
        history.push('/admin/pieces')
      } catch (err) {}
    }
  }

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
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
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
    </React.Fragment>
  )
}

export default SignInForm
