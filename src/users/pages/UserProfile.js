import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

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

import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/hooks/http-hook'

import ActionButton from '../../shared/components/ui/ActionButton'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import Background from '../../shared/layouts/Background'

import LoadingGraphic from '../../shared/components/ui/LoadingGraphic'
import NotFound from '../../shared/components/navigation/NotFound'

const { REACT_APP_BACKEND_URL } = process.env

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}))

const UserProfile = () => {
  const auth = useContext(AuthContext)
  const classes = useStyles()

  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [user, setUser] = useState()
  const username = useParams().username

  const history = useHistory()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/users/${username}`
        )
        setUser(responseData.user)
      } catch (err) {}
    }
    fetchUser()
  }, [sendRequest, username])

  const handleClose = event => {
    if (auth.user) {
      history.goBack()
    } else {
      history.push('/')
    }
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="sm">
        {!user && !isLoading && error && <NotFound />}
        {user && !isLoading && (
          <Grid container justify="flex-start" direction="column">
            <Box height="5vh"></Box>
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
              <Box height="4vh"></Box>
            </PieceBox>
            <Box height="10vh"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default UserProfile
