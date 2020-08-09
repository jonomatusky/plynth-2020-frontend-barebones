import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography, Button } from '@material-ui/core'
import {
  PieceBox,
  BarRow,
  TopRow,
  ImageBox,
  PieceImage,
  TitleBox,
  TitleText,
  CardRow,
  PieceTitle,
  DescriptionBox,
  DescriptionText,
  LinkRow,
} from '../../shared/components/UIElements/CardSections'
import styled from 'styled-components'

import { useHttpClient } from '../../shared/hooks/http-hook'

import ActionButton from '../../shared/components/UIElements/ActionButton'
import UserForm from '../components/UserForm'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PageTitle from '../../shared/components/UIElements/PageTitle'
import Background from '../../shared/components/UIElements/Background'

import theme from '../../theme'
import LoadingGraphic from '../../shared/components/UIElements/LoadingGraphic'

const { REACT_APP_BACKEND_URL } = process.env

const UserProfile = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [user, setUser] = useState()
  const userId = useParams().userId

  const history = useHistory()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/users/${userId}`
        )
        setUser(responseData.user)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest])

  const handleClose = event => {
    history.goBack()
  }

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          {user && (
            <PieceBox container direction="column">
              <BarRow onClick={handleClose} buttonLabel="Close X" />
              <TopRow container>
                <ImageBox item xs={6}>
                  <PieceImage src={user.avatarLink} alt="Preview" />
                </ImageBox>
                <TitleBox item xs={6}>
                  <TitleText container direction="column" justify="center">
                    <Box
                      flexGrow={1}
                      display="flex"
                      alignItems="center"
                      padding="1rem"
                    >
                      <PieceTitle variant="h5">{user.displayName}</PieceTitle>
                    </Box>
                  </TitleText>
                </TitleBox>
              </TopRow>
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
            </PieceBox>
          )}
          <Box height="5vh"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default UserProfile
