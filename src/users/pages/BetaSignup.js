import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { Container, Grid, Box, Typography, Button } from '@material-ui/core'

import theme from '../../theme'
import { TextField } from '../../shared/components/FormElements/FormElements'
import ActionButton from '../../shared/components/UIElements/ActionButton'
import PageTitle from '../../shared/components/UIElements/PageTitle'
import Background from '../../shared/components/UIElements/Background'
import styled from 'styled-components'

import {
  PieceBox,
  BarRow,
} from '../../shared/components/UIElements/CardSections'
import ActionBar from '../../shared/components/Navigation/ActionBar'

const { REACT_APP_BACKEND_URL } = process.env

const BottomButton = styled.div`
  top: 'auto';
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  right: 0;
`

const BetaSignup = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)

  const handleClose = event => {
    history.push('/')
  }

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/users/subscribe`,
        'POST',
        JSON.stringify(userData),
        {
          'Content-Type': 'application/json',
        }
      )
      setSubmitted(true)
    } catch (err) {}
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('Required'),
  })

  return (
    <Background>
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="10vh"></Box>
          {!submitted ? (
            <Grid item>
              <PageTitle title="Sign Up" />
              <Typography>
                We're opening up our beta app in just a few more weeks. Sign up
                here to get notified when we launch.
              </Typography>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item>
                <PageTitle title="Thanks!" />
                <Typography>
                  You're all signed up. We'll let you know as soon as the beta's
                  available. If you don't want to wait, check out our monthly
                  merch subscription service here:
                </Typography>
              </Grid>
              <Grid item>
                <ActionButton
                  href="http://www.plynth.com"
                  label="Join the Club"
                />
              </Grid>
            </React.Fragment>
          )}
          {!submitted && (
            <Grid item>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <PieceBox container direction="column">
                    <BarRow buttonLabel="Cancel X" onClick={handleClose} />
                    <Box minHeight="20vh">
                      <Grid container justify="center" alignItems="center">
                        <Grid item xs={11}>
                          <Grid container direction="column" spacing={1}>
                            <Box height="0.75rem"></Box>
                            <Grid item>
                              <TextField
                                name="email"
                                label="Email"
                                type="text"
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
                    <ActionButton type="submit" label="Submit" />
                  </PieceBox>
                </Form>
              </Formik>
            </Grid>
          )}
          {/* <ActionBar secondaryAction={handleClose} secondaryLabel="Cancel" /> */}
        </Grid>
      </Container>
      <BottomButton>
        <Grid container justify="center">
          <Button onClick={handleClose}>Return to Home Screen</Button>
        </Grid>
      </BottomButton>
    </Background>
  )
}

export default BetaSignup
