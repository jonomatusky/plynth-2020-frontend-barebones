import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'

import UserCard from 'components/UserCard'
import NotFound from 'layouts/NotFound'
import ActionButton from 'components/ActionButton'

const UserProfile = props => {
  const history = useHistory()
  const { status, request } = useRequest()
  const [user, setUser] = useState()
  const { username, code } = useParams()

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
              {code && (
                <>
                  <Grid item xs={12}>
                    <Box mt={2} mb={1}>
                      <Typography align="center">
                        Click here to claim your profile:
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <ActionButton
                      onClick={() => history.push(`/${username}/claim/${code}`)}
                      label="Claim Profile"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Container>
      )}
    </>
  )
}

export default UserProfile
