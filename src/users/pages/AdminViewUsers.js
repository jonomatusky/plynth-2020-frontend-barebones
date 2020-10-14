import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { Container, Grid, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import MessageBar from '../../shared/components/notifications/MessageBar'
import UserList from '../components/UserList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'

const title = 'Users'

const ViewUsers = () => {
  const { users } = useSelector(state => state.users)
  const { pieces } = useSelector(state => state.pieces)
  const location = useLocation()
  const [message, setMessage] = useState(null)

  const items = users.map(user => {
    let pieceCount = pieces.filter(
      piece => piece.owner.username === user.username
    ).length
    return { pieceCount, ...user }
  })

  useEffect(() => {
    setMessage((location.state || {}).message)
  }, [location.state])

  return (
    <Container maxWidth="sm">
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
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
            <UserList items={items} />
          </Grid>
        </Grid>
      )}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewUsers
