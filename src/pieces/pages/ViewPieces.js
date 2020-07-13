import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import { Container, Grid, Box } from '@material-ui/core'

import PageTitle from '../../shared/components/UIElements/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ActionButton from '../../shared/components/UIElements/ActionButton'

const { REACT_APP_BACKEND_URL } = process.env

const title = 'My Pieces'

const ViewPieces = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const [open, setOpen] = useState(false)
  const [pieceId, setPieceId] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces`
        )
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest])

  return (
    <Container maxWidth="sm">
      <PageTitle title={title} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPieces && (
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            {/* <Button
              variant="contained"
              color="primary"
              component={NavLink}
              to={'/create'}
              disableElevation={true}
              fullWidth={true}
            >
              Create New Piece +
            </Button> */}
            <ActionButton
              component={NavLink}
              to={'/create'}
              label="Create New Piece +"
            ></ActionButton>
          </Grid>
          <Grid item>
            <PieceList items={loadedPieces} />
          </Grid>
        </Grid>
      )}
      <Box height="4rem"></Box>
    </Container>
  )
}

export default ViewPieces
