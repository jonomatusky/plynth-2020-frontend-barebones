import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Box, Grid } from '@material-ui/core'

import Background from '../../shared/layouts/Background'
import PieceForm from '../components/PieceForm'
import { PieceBox, BarRow } from '../../shared/components/ui/CardSections'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

const NewPiece = () => {
  const [imageFilepath, setImageFilepath] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    if (!sessionStorage.getItem('imageFilepath')) {
      console.log('no image in session storage')
      history.push('/')
    } else {
      let imageFilepath = sessionStorage.getItem('imageFilepath')
      setImageFilepath(imageFilepath)
      sessionStorage.removeItem('imageFilepath')
      setIsLoading(false)
    }
  }, [history])

  const handleSubmit = async response => {
    history.push(`/admin/pieces/${response.piece.id}`)
  }

  return (
    <React.Fragment>
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
                  onSubmit={handleSubmit}
                  imageFilepath={imageFilepath}
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
