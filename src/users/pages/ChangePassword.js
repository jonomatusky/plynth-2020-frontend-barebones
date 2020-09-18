import React from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/components/ui/Background'
import SetPasswordForm from '../components/SetPasswordForm'

import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

// need to change loggedOut to auth instead of props
const ChangePassword = () => {
  const history = useHistory()

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          <Grid item>
            <PageTitle title="Set Password" />
            <Typography>Change your password</Typography>
          </Grid>
          <Grid item>
            <PieceBox container direction="column">
              <BarRow
                buttonLabel="Cancel X"
                onClick={() => {
                  history.push('admin/profile')
                }}
              />
              <Grid container justify="center" alignItems="center">
                <Grid item xs={11}>
                  <Box height="0.75rem"></Box>
                  <SetPasswordForm />
                  <Box height="0.75rem"></Box>
                </Grid>
              </Grid>
            </PieceBox>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default ChangePassword
