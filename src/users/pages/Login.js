import React from 'react'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import LoginForm from '../components/LoginForm'
import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/components/ui/Background'

import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

const SignUp = () => {
  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          <Grid item>
            <PageTitle title="Log In" />
            <Typography>Fill out the form below to log in.</Typography>
          </Grid>
          <Grid item>
            <PieceBox container direction="column">
              <BarRow />
              <Grid container justify="center" alignItems="center">
                <Grid item xs={11}>
                  <Box height="0.75rem"></Box>
                  <LoginForm />
                  <Box height="1rem"></Box>
                </Grid>
              </Grid>
            </PieceBox>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default SignUp
