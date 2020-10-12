import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Grid, Box, Avatar } from '@material-ui/core'
import {
  PieceBox,
  BarRow,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
} from '../../shared/components/ui/CardSections'
import { makeStyles } from '@material-ui/core/styles'

import { useApiClient } from '../../shared/hooks/api-hook'

import ActionButton from '../../shared/components/ui/ActionButton'
import Background from '../../shared/layouts/Background'

import NotFound from '../../shared/components/navigation/NotFound'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UserProfile = props => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const classes = useStyles()

  const { isLoading, error, sendRequest } = useApiClient()
  const [user, setUser] = useState()
  const username = useParams().username

  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`/users/${username}`)
        setUser(responseData.user)
        console.log(responseData.user)
      } catch (err) {}
    }
    fetchUser()
  }, [sendRequest, username])

  const handleClose = event => {
    const { referrer } = props.location.state || {}
    console.log(referrer)
    if (!!referrer) {
      history.push(referrer)
    } else if (isLoggedIn) {
      history.goBack()
    } else {
      history.push('/')
    }
  }

  return (
    <>
      <Background />
      <Container maxWidth="xs">
        {!user && !isLoading && error && <NotFound />}
        {user && !isLoading && (
          <Grid container justify="flex-start" direction="column">
            <Box height="1.5rem"></Box>
            <PieceBox container direction="column">
              <BarRow onClick={handleClose} buttonLabel="Close X" />
              <ProfileTopRow
                container
                alignContent="center"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={5}>
                  <Grid container justify="center">
                    <Grid item>
                      {user.avatar && (
                        <Avatar
                          src={user.avatarLink}
                          alt="Preview"
                          className={classes.large}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <Box textAlign="left" padding={1} overflow="hidden">
                    <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                  </Box>
                </Grid>
              </ProfileTopRow>
              <CardRow container justify="center">
                <DescriptionBox item xs={11}>
                  <DescriptionText>{user.bio}</DescriptionText>
                </DescriptionBox>
              </CardRow>
              {user.links.map(link => {
                return (
                  <LinkRow container key={link._id} justify="center">
                    <Grid item xs={11}>
                      <ActionButton
                        target="_blank"
                        href={link.url}
                        label={link.name}
                      />
                    </Grid>
                  </LinkRow>
                )
              })}
              <Box height="1rem"></Box>
            </PieceBox>
            <Box height="1.5rem"></Box>
          </Grid>
        )}
      </Container>
    </>
  )
}

export default UserProfile
