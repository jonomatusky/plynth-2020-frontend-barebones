import React, { useState, useEffect } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid, Box, Button, Avatar } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import PieceCard from '../components/PieceCard'
import ActionBar from '../../shared/components/Navigation/ActionBar'

import {
  PieceBox,
  BarRow,
  TopRow,
  ImageBox,
  PieceImage,
  TitleBox,
  TitleText,
  PieceTitle,
  CardRow,
  AvatarBox,
  AvatarTypography,
  UnstyledLink,
  DescriptionBox,
  DescriptionText,
  LinkRow,
  BottomRow,
} from '../../shared/components/UIElements/CardSections'

const { REACT_APP_BACKEND_URL } = process.env

const EditPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [piece, setPiece] = useState()
  const pieceId = useParams().pieceId

  const history = useHistory()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        setPiece(responseData.piece)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest, pieceId])

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`,
        'PATCH',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
    } catch (err) {}
  }

  return (
    <Container maxWidth="sm">
      <Grid container justify="center">
        <Grid item xs={11}>
          <Box height="4vh"></Box>
          <PieceBox container direction="column">
            <BarRow
              onClick={() => {
                history.push('/collection')
              }}
              buttonLabel={'Close X'}
            />
            {piece && (
              <Grid item>
                <PieceForm pieceId={piece.id} onSubmit={onSubmit} />
              </Grid>
            )}
            <Box height="4vh"></Box>
          </PieceBox>
          <Box height="4vh"></Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EditPiece
