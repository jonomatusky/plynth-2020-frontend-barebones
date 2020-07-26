import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Box, Grid } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PageTitle from '../../shared/components/UIElements/PageTitle'

import styled from 'styled-components'
import theme from '../../theme'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const ASSET_URL = process.env.REACT_APP_ASSET_URL

const title = 'Create New Piece'

const ImageBox = styled(Box)`
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const NewPiece = () => {
  const [imageData, setImageData] = useState({
    id: null,
    ext: null,
  })
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  if (
    !sessionStorage.getItem('imageId') ||
    !sessionStorage.getItem('imageExt')
  ) {
    console.log('no image in session storage')
    history.push('/')
  }

  useEffect(() => {
    setImageData({
      id: sessionStorage.getItem('imageId'),
      ext: sessionStorage.getItem('imageExt'),
    })
  }, [])

  const onSubmit = async formData => {
    try {
      const pieceData = { imageData, pieceData: formData }
      const res = await sendRequest(
        BACKEND_URL + '/pieces/',
        'POST',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      history.push(`/pieces/${res.pieceId}`)
    } catch (err) {}
  }

  return (
    <Container maxWidth="xs">
      <PageTitle title={title} />
      <Grid container direction="column">
        <Grid container justify="center">
          <ImageBox>
            <Image
              src={`${ASSET_URL}/${imageData.id}.${imageData.ext}`}
              alt="Preview"
            />
          </ImageBox>
        </Grid>
        <Grid item>
          {isLoading && <LoadingSpinner asOverlay />}
          <PieceForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
      <Box height="5rem" />
    </Container>
  )
}

export default NewPiece
