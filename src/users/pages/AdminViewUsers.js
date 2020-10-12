import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Container, Grid, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import UserList from '../components/UserList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'

const title = 'Users'

const ViewUsers = () => {
  const { users } = useSelector(state => state.users)

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {!users && <LoadingSpinner asOverlay />}
      {users && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              component={NavLink}
              to={'/admin/users/new'}
              label="Add User +"
            ></ActionButton>
          </Grid>
          <Grid item>
            <UserList items={users} />
          </Grid>
        </Grid>
      )}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewUsers
