import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Link,
} from '@material-ui/core'

import { AuthContext } from '../../shared/context/auth-context'
import ErrorBar from '../../shared/components/UIElements/ErrorBar'
import Background from '../../shared/components/UIElements/Background'
import PageTitle from '../../shared/components/UIElements/PageTitle'
import SignUpForm from '../components/SignUpForm'
import {
  PieceBox,
  BarRow,
} from '../../shared/components/UIElements/CardSections'

const { REACT_APP_BACKEND_URL } = process.env

const SignUp = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)

  const handleClose = event => {
    history.push('/')
  }

  const handleSubmit = async values => {
    try {
      const responseData = await sendRequest(
        REACT_APP_BACKEND_URL + '/auth/signup',
        'POST',
        JSON.stringify({
          user: values,
        }),
        {
          'Content-Type': 'application/json',
        }
      )

      auth.login(responseData.userId, responseData.token)
      history.push('/collection')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          {!submitted ? (
            <Grid item>
              <PageTitle title="Sign Up" />
              <Typography>
                Fill out the form below to create an account.
              </Typography>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item>
                <PageTitle title="Thanks!" />
                <Typography>Account Created!</Typography>
              </Grid>
              <Grid item>
                <Button onClick={handleClose}>Close</Button>
              </Grid>
            </React.Fragment>
          )}
          {!submitted && (
            <Grid item>
              <PieceBox container direction="column">
                <BarRow buttonLabel="Cancel X" onClick={handleClose} />
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={11}>
                    <Box height="0.75rem"></Box>
                    <SignUpForm onSubmit={handleSubmit} />
                    <Box height="0.75rem"></Box>
                  </Grid>
                </Grid>
              </PieceBox>
            </Grid>
          )}
          <Grid item>
            <Typography>Already have an account?</Typography>
            <Link
              onClick={() => {
                history.push('/login')
              }}
              color="inherit"
              variant="body1"
            >
              <strong>Log In</strong>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default SignUp
