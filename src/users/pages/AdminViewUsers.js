import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Container, Grid, Box, Button } from '@material-ui/core'

import PageTitle from '../../shared/components/ui/PageTitle'
import MessageBar from '../../shared/components/notifications/MessageBar'
import UserList from '../components/UserList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'
import FilterButtons from '../../shared/components/ui/FilterButtons'
import { getUsersByFilter, setFilter } from '../../redux/usersSlice'
import { AuthContext } from '../../shared/context/auth-context'

const title = 'Users'

const ViewUsers = () => {
  const auth = useContext(AuthContext)
  const users = useSelector(getUsersByFilter)
  const { filter } = useSelector(state => state.users)
  const { pieces } = useSelector(state => state.pieces)
  const location = useLocation()
  const [message, setMessage] = useState(null)

  const filterButtons = [
    {
      label: 'Active',
      filterLabel: 'ACTIVE',
    },
    { label: 'All', filterLabel: 'ALL' },
    { label: 'Dummy', filterLabel: 'DUMMY' },
    { label: 'Admin', filterLabel: 'ADMIN' },
  ]

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
      <PageTitle title={title}>
        <Button onClick={auth.logout}>Log Out</Button>
      </PageTitle>
      {!users && <LoadingSpinner asOverlay />}
      {users && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          {/* <Grid item>
            <ActionButton
              component={NavLink}
              to={'/admin/users/new'}
              label="Add User +"
            ></ActionButton>
          </Grid> */}
          <Grid item>
            <FilterButtons
              items={filterButtons}
              currentFilter={filter}
              filterFunction={setFilter}
            />
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
