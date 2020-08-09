import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { Container, Grid, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import UserList from '../components/UserList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ActionButton from '../../shared/components/UIElements/ActionButton'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'Users'

const ViewUsers = () => {
  const [loadedUsers, setLoadedUsers] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${REACT_APP_BACKEND_URL}/users`)
        setLoadedUsers(responseData.users)
      } catch (err) {}
    }
    fetchUsers()
  }, [sendRequest])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedUsers && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              component={NavLink}
              to={'/signup'}
              label="Add User +"
            ></ActionButton>
          </Grid>
          <Grid item>
            <UserList items={loadedUsers} />
          </Grid>
        </Grid>
      )}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewUsers
