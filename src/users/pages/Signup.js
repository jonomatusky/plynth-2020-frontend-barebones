import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { Container, Grid, Box, Typography, Button } from '@material-ui/core'
import UserForm from '../components/UserForm'

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
    history.goBack()
  }

  const handleSubmit = async values => {
    try {
      const userData = { user: values }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/users/signup`,
        'POST',
        JSON.stringify(userData),
        {
          'Content-Type': 'application/json',
        }
      )
      setSubmitted(true)
    } catch (err) {}
  }

  return (
    <React.Fragment>
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
                <Typography>Your account has been created!</Typography>
              </Grid>
              <Grid item>
                <Button onClick={handleClose}>Close</Button>
              </Grid>
              {/* <Grid item>
                <ActionButton
                  href="http://www.plynth.com"
                  label="Join the Club"
                />
              </Grid> */}
            </React.Fragment>
          )}
          {!submitted && (
            <Grid item>
              <PieceBox container direction="column">
                <BarRow buttonLabel="Cancel X" onClick={handleClose} />
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={11}>
                    <Box height="0.75rem"></Box>
                    <UserForm onSubmit={handleSubmit} />
                    <Box height="0.75rem"></Box>
                  </Grid>
                </Grid>
              </PieceBox>
            </Grid>
          )}
          {/* <ActionBar secondaryAction={handleClose} secondaryLabel="Cancel" /> */}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default BetaSignup
