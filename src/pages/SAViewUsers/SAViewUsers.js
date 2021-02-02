import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Container, Grid, Box } from '@material-ui/core'

import { useSAUsersStore } from 'hooks/store/use-sa-users-store'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'

import PageTitle from 'components/PageTitle'
import UserList from './components/UserList'
import LoadingSpinner from 'components/LoadingSpinner'
import FilterButtons from 'components/FilterButtons'
import ActionButton from 'components/ActionButton'

const title = 'Users'

const ViewUsers = () => {
  const history = useHistory()
  const {
    fetchUsers,
    status,
    filter,
    getUsersByFilter,
    setFilter,
  } = useSAUsersStore()
  const users = getUsersByFilter()
  const { pieces } = useSAPiecesStore()

  useEffect(() => {
    const fetch = () => {
      fetchUsers()
    }

    if (status === 'idle') {
      fetch()
    }
  }, [fetchUsers, status])

  const filterButtons = [
    {
      label: 'Active',
      filterLabel: 'ACTIVE',
    },
    {
      label: 'HXC',
      filterLabel: 'HXC',
    },
    {
      label: 'Inactive',
      filterLabel: 'INACTIVE',
    },
    { label: 'All', filterLabel: 'ALL' },
    { label: 'Demo', filterLabel: 'DEMO' },
    { label: 'Admin', filterLabel: 'ADMIN' },
  ]

  const items = users
    .map(user => {
      let pieceCount = pieces.filter(
        piece =>
          piece.owner.username === user.username && piece.isRemoved !== true
      ).length
      return { pieceCount, ...user }
    })
    .filter(user => filter !== 'HXC' || user.pieceCount > 0)

  console.log(filter)

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {!users && <LoadingSpinner asOverlay />}
      {users && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item>
            <ActionButton
              onClick={() => history.push('/superadmin/new-user')}
              label="Add User +"
            ></ActionButton>
          </Grid>
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
