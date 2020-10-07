import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import theme from '../../theme'
import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'
import { TextField } from '../../shared/components/forms/FormElements'
import ActionButton from '../../shared/components/ui/ActionButton'
import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/layouts/Background'

const BetaSignup = () => {
  const { isLoading, error, sendRequest, clearError } = useApiClient()
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)

  let scanToken = sessionStorage.getItem('scanToken')

  const handleClose = event => {
    console.log('closing')
    event.preventDefault()
    history.push('/')
  }

  const handleSubmit = async values => {
    console.log('submitting')
    try {
      const userData = { user: values }
      await sendRequest(`/users/subscribe`, 'POST', userData)
      setSubmitted(true)
      if (!!scanToken) {
        await sendRequest(`/scans`, 'PATCH', { email: values.email, scanToken })
      }
    } catch (err) {}
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('Required'),
  })

  return (
    <>
      <ErrorBar
        open={!!error && !submitted}
        error={error}
        handleClose={clearError}
      />
      <Background>
        <Container maxWidth="xs">
          <Grid container justify="flex-start" direction="column" spacing={2}>
            <Box height="10vh"></Box>
            {!submitted ? (
              <Grid item>
                <PageTitle title="Sign Up" />
                <Typography>
                  We're currently in beta and opening up the app soon. Enter
                  your email address below to be the first to know.
                </Typography>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid item>
                  <PageTitle title="Thanks!" />
                  <Typography>
                    You're all signed up. We'll let you know as soon as the
                    app's available. In the meantime, check out our website for
                    more info.
                  </Typography>
                </Grid>
                <Grid item>
                  <ActionButton
                    href="http://site.plynth.com"
                    label="Learn more"
                  />
                </Grid>
              </React.Fragment>
            )}
            {!submitted && (
              <Grid item>
                <BarRow buttonLabel="Cancel X" onClick={handleClose} />
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <PieceBox container direction="column">
                      <Box minHeight="20vh">
                        <Grid container justify="center" alignItems="center">
                          <Grid item xs={11}>
                            <Grid container direction="column" spacing={1}>
                              <Box height="0.75rem"></Box>
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
                                      By submitting this form, you agree to
                                      recieve updates from the Plynth team.
                                    </em>
                                  </Typography>
                                </Box>
                              </Grid>
                              <Box height="1.5rem"></Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                      <ActionButton
                        type="submit"
                        label="Submit"
                        loading={isLoading}
                      />
                    </PieceBox>
                  </Form>
                </Formik>
              </Grid>
            )}
            <Grid item>
              <Grid container justify="center">
                <Button onClick={handleClose}>Return to Home Screen</Button>
              </Grid>
            </Grid>
            {/* <ActionBar secondaryAction={handleClose} secondaryLabel="Cancel" /> */}
          </Grid>
        </Container>
      </Background>
    </>
  )
}

export default BetaSignup
