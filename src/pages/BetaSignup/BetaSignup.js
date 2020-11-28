import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Grid, Box, Typography, Button } from '@material-ui/core'

import theme from 'theme'
import { useRequest } from 'hooks/use-request'
import { useLogClient } from 'hooks/log-hook'

import { TextField } from 'components/FormElements'
import ActionButton from 'components/ActionButton'
import FormLayout from 'layouts/FormLayout'
import MessageLayout from 'layouts/MessageLayout'
import { useAlertStore } from 'hooks/store/use-alert-store'

const BetaSignup = () => {
  const { setError } = useAlertStore()
  const scanToken = useSelector(state => state.scan)
  const { isLoading, request } = useRequest()
  const { sendLog } = useLogClient()
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)

  const handleClose = event => {
    event.preventDefault()
    history.push('/')
  }

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      await request({
        url: `/users/subscribe`,
        method: 'POST',
        data: userData,
      })
      setSubmitted(true)
      if (!!scanToken) {
        await sendLog({
          url: `/scans`,
          data: { email: values.email, scanToken },
        })
      }
    } catch (err) {
      console.log('there was an error')
      setError({ message: err.message })
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('Required'),
  })

  return (
    <>
      {!submitted ? (
        <FormLayout
          title="Sign Up"
          message={`We're currently in beta and opening up the app soon. Enter your
           email address below to be the first to know.`}
        >
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    autocapitalize="off"
                    autocorrect="off"
                  />
                </Grid>
                <Grid item>
                  <Box color={theme.palette.secondary.main}>
                    <Typography variant="body2">
                      <em>
                        By submitting this form, you agree to recieve updates
                        from the Plynth team.
                      </em>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <ActionButton
                    type="submit"
                    label="Submit"
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </FormLayout>
      ) : (
        <MessageLayout
          title="Thanks"
          message={`You're all signed up. We'll let you know as soon as the app's
            available. In the meantime, check out our website for more info.`}
        >
          <Grid item>
            <ActionButton href="http://site.plynth.com" label="Learn more" />
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Button onClick={handleClose}>Back</Button>
            </Grid>
          </Grid>
        </MessageLayout>
      )}
    </>
  )
}

export default BetaSignup
