import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container, Grid, Box } from '@material-ui/core'

import ErrorBar from '../../shared/components/notifications/ErrorBar'
import PageTitle from '../../shared/components/ui/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'

const title = 'My Pieces'

const MyPieces = () => {
  const [loadedPieces, setLoadedPieces] = useState()
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  useEffect(() => {
    console.log('useEffect')
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(`/users/me/pieces`)
        console.log('setting pieces')
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }

    fetchPieces()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <Container maxWidth="sm">
        <PageTitle title={title} />
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              component={Link}
              to={'/admin/create/style'}
              label="Create New Piece +"
            ></ActionButton>
          </Grid>
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoading && loadedPieces && (
            <Grid item>
              <PieceList items={loadedPieces} />
            </Grid>
          )}
        </Grid>
        <Box height="4rem"></Box>
      </Container>
    </React.Fragment>
  )
}

export default MyPieces
