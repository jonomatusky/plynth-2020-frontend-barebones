import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Grid, Box } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'

import UserCard from 'components/UserCard'
import NotFound from 'layouts/NotFound'

const UserProfile = props => {
  const { status, request } = useRequest()
  const [user, setUser] = useState()
  const username = useParams().username

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await request({
          url: `/users/${username}`,
          quiet: true,
        })
        setUser(responseData.user)
      } catch (err) {}
    }
    fetchUser()
  }, [request, username])

  return (
    <>
      {status === 'failed' && <NotFound />}
      {user && status === 'succeeded' && (
        <Container maxWidth="xs">
          <Box pt="1.5rem" pb="1.5rem">
            <Grid container>
              <Grid item xs={12}>
                <UserCard user={user} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  )
}

export default UserProfile
