import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { AuthContext } from '../../shared/context/auth-context'
import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/layouts/Background'
import EmailForm from '../components/EmailForm'

import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const auth = useContext(AuthContext)
  const user = auth.user
  const history = useHistory()

  const handleSubmit = () => {
    history.push({
      pathname: '/admin/profile',
      state: { message: 'Email successfully updated.' },
    })
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Grid item>
            <PageTitle title="Email Preferences" />
          </Grid>
          <Grid item>
            <Typography>Update your email address.</Typography>
          </Grid>
          <Grid item>
            <PieceBox container direction="column">
              <BarRow
                buttonLabel="Cancel X"
                onClick={() => {
                  history.push('/admin/profile')
                }}
              />
              <Grid container justify="center" alignItems="center">
                <Grid item xs={11}>
                  <Box height="1rem"></Box>
                  <EmailForm user={user} onSubmit={handleSubmit} />
                  <Box height="1.5rem"></Box>
                </Grid>
              </Grid>
            </PieceBox>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UpdateEmail
