import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { AuthContext } from '../../shared/context/auth-context'
import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/layouts/Background'
import UsernameForm from '../components/UsernameForm'

import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

// need to change loggedOut to auth instead of props
const ChangeUsername = () => {
  const auth = useContext(AuthContext)
  const user = auth.user
  const history = useHistory()

  const handleSubmit = () => {
    console.log('submitted')
    history.push({
      pathname: '/admin/profile',
      state: { message: 'Username successfully updated.' },
    })
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Grid item>
            <PageTitle title="Change Username" />
          </Grid>
          <Grid item>
            <Typography>
              Are you sure you want to change your username? Links to your old
              profile will <strong>not</strong> be forwarded automatically. You
              may not be able to change your username back. Usernames must be
              between 6 and 30 characters and can only contain numbers, letters,
              "." and "_".
            </Typography>
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
                  <Box height="0.75rem"></Box>
                  <UsernameForm user={user} onSubmit={handleSubmit} />
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

export default ChangeUsername
