import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from 'contexts/auth-context'
import { useRequest } from 'hooks/use-request'
import FormLayout from 'layouts/FormLayout'
import { BarRow } from 'components/CardSections'
import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'
import useAlertStore, { userAlertStore } from 'hooks/store/use-alert-store'

const initialValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please provide your email address')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .required('Required'),
  passwordConfirmation: Yup.string()
    .min(5, 'Password must be at least 5 characters long')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const ClaimProfile = ({ values }) => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const { status, request } = useRequest()
  const { username, code } = useParams()
  const { setMessage } = useAlertStore()

  const handleSubmit = async values => {
    try {
      let { email, password } = values

      const { token } = await request({
        url: `/auth/claim`,
        method: 'POST',
        data: { email, username, password, id: code },
      })

      auth.login(token)
      setMessage({
        message: `It's all yours! To make changes, hit the Edit Profile button.`,
      })
    } catch (err) {}
  }

  return (
    <FormLayout
      title={`Claim @${username}`}
      message={`Enter an email address and password to claim this user and edit your profile.`}
      bar={
        <BarRow
          buttonLabel="Cancel X"
          onClick={() => {
            history.push('/')
          }}
        />
      }
    >
      <Formik
        enableReinitialize="true"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField name="email" label="Enter your email" type="email" />
              </Grid>
              <Grid item>
                <Box height="1rem"></Box>
              </Grid>
              <Grid item>
                <TextField
                  name="password"
                  label="Create a password"
                  type="password"
                />
              </Grid>
              <Grid item>
                <TextField
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
              <Grid item>
                <Box height="1rem"></Box>
              </Grid>
              <Grid item>
                <ActionButton
                  type="submit"
                  label={`Submit`}
                  loading={status === 'loading'}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </FormLayout>
  )
}

export default ClaimProfile
