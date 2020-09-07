import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Paper,
} from '@material-ui/core'
import {
  PieceBox,
  BarRow,
  Avatar,
  ProfileTopRow,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
  BottomRow,
} from '../../shared/components/UIElements/CardSections'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import ActionButton from '../../shared/components/UIElements/ActionButton'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import Background from '../../shared/components/UIElements/Background'

import theme from '../../theme'
import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'
import NotFound from '../../shared/components/Navigation/NotFound'

const { REACT_APP_BACKEND_URL } = process.env

const UserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [editMode, setEditMode] = useState(false)
  const [user, setUser] = useState()
  const username = useParams().username

  const history = useHistory()

  useEffect(() => {
    if (editMode === false) {
      const fetchUser = async () => {
        try {
          const responseData = await sendRequest(
            `${REACT_APP_BACKEND_URL}/users/${username}`
          )
          setUser(responseData.user)
        } catch (err) {}
      }
      fetchUser()
    }
  }, [sendRequest, username, editMode])

  const handleClose = event => {
    history.goBack()
  }

  const TopRow = styled(Grid)``

  const ImageBox = styled(Grid)`
    padding: 0.5rem 1.5rem;
  `

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
                  <Box>
                    {user.avatar && (
                      <Avatar src={user.avatarLink} alt="Preview" />
                    )}
                  </Box>
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
