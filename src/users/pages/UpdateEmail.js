import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { setUser } from '../../redux/authSlice'
import PageTitle from '../../shared/components/ui/PageTitle'
import Background from '../../shared/layouts/Background'
import EmailForm from '../components/UpdateEmailForm'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'

// need to change loggedOut to auth instead of props
const UpdateEmail = () => {
  const { user } = useSelector(state => state.auth)
  const { email } = user || {}
  const dispatch = useDispatch()

  const history = useHistory()

  const handleSubmit = response => {
    dispatch(setUser({ user: response.user }))
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
                  <EmailForm email={email} onSubmit={handleSubmit} />
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
