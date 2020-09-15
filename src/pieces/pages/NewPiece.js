import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Box, Grid } from '@material-ui/core'

import PieceForm from '../components/PieceForm'
import ErrorBar from '../../shared/components/UIElements/ErrorBar'

import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PageTitle from '../../shared/components/UIElements/PageTitle'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const title = 'Create New Piece'

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
    sessionStorage.setItem('imageId', null)
    sessionStorage.setItem('imageExt', null)
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
      history.push(`/admin/pieces/${res.pieceId}`)
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Container maxWidth="xs">
        <PageTitle title={title} />
        <Grid container direction="column">
          <Grid item>
            {isLoading && <LoadingSpinner asOverlay />}
            <PieceForm
              onSubmit={onSubmit}
              imageFilePath={`${imageData.id}.${imageData.ext}`}
            />
          </Grid>
        </Grid>
        <Box height="5rem" />
      </Container>
    </React.Fragment>
  )
}

export default NewPiece
