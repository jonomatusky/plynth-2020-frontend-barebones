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

import LoginForm from '../components/LoginForm'
import PageTitle from '../../shared/components/UIElements/PageTitle'
import Background from '../../shared/components/UIElements/Background'

import { AuthContext } from '../../shared/context/auth-context'

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
        REACT_APP_BACKEND_URL + '/auth/login',
        'POST',
        JSON.stringify({
          user: values,
        }),
        {
          'Content-Type': 'application/json',
        }
      )

      auth.login(responseData.user, responseData.token)
      history.push('/admin/pieces')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          {!submitted ? (
            <Grid item>
              <PageTitle title="Log In" />
              <Typography>Fill out the form below to log in.</Typography>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item>
                <PageTitle title="Thanks!" />
                <Typography>Signed In!</Typography>
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
                    <LoginForm onSubmit={handleSubmit} />
                    <Box height="0.75rem"></Box>
                  </Grid>
                </Grid>
              </PieceBox>
            </Grid>
          )}
          {/* <Grid item>
            <Typography>Don't have an account?</Typography>
            <Link
              onClick={() => {
                history.push('/signup')
              }}
              color="inherit"
              variant="body1"
            >
              <strong>Sign Up</strong>
            </Link>
          </Grid> */}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default SignUp
