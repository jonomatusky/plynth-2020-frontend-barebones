import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, Grid } from '@material-ui/core'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import PieceForm from '../components/PieceForm'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const NewPiece = () => {
  const [imageData, setImageData] = useState({
    id: null,
    ext: null,
  })
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const history = useHistory()

  useEffect(() => {
    if (
      !sessionStorage.getItem('imageId') ||
      !sessionStorage.getItem('imageExt')
    ) {
      console.log('no image in session storage')
      history.push('/')
    } else {
      setImageData({
        id: sessionStorage.getItem('imageId'),
        ext: sessionStorage.getItem('imageExt'),
      })
    }
  }, [history])

  // useEffect(() => {

  //   sessionStorage.removeItem('imageId')
  //   sessionStorage.removeItem('imageExt')
  // }, [])

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
      <Background />
      <Container maxWidth="sm">
        {isLoading && <LoadingSpinner asOverlay />}
        {!isLoading && (
          <Grid container justify="flex-start" direction="column">
            <Box height="4vh"></Box>
            <PieceBox container direction="column">
              <BarRow
                title="Create New Piece"
                onClick={() => {
                  history.push('admin/pieces')
                }}
                buttonLabel={'Cancel X'}
              />
              <Grid item>
                <PieceForm
                  onSubmit={onSubmit}
                  imageFilePath={`${imageData.id}.${imageData.ext}`}
                />
              </Grid>
              <Box height="4vh"></Box>
            </PieceBox>
            <Box height="4vh"></Box>
          </Grid>
        )}
      </Container>
    </React.Fragment>
  )
}

export default NewPiece
