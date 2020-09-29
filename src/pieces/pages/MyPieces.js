import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { useApiClient } from '../../shared/hooks/api-hook'
import { Container, Grid } from '@material-ui/core'

import { AuthContext } from '../../shared/context/auth-context'
import Background from '../../shared/layouts/Background'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import MessageBar from '../../shared/components/notifications/MessageBar'
import PageTitle from '../../shared/components/ui/PageTitle'
import PieceList from '../components/PieceList'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'
import ActionButton from '../../shared/components/ui/ActionButton'

const title = 'My Pieces'

const MyPieces = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [loadedPieces, setLoadedPieces] = useState()
  const [message, setMessage] = useState(null)
  const { isLoading, error, sendRequest, clearError } = useApiClient()

  let pieceLimit = (auth.user || {}).pieceLimit

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(`/users/me/pieces`)
        setLoadedPieces(responseData.pieces)
      } catch (err) {}
    }

    fetchPieces()
  }, [sendRequest])

  const handleClick = () => {
    if (pieceLimit <= loadedPieces.length) {
      setMessage(
        `Sorry, looks like you've reached your piece limit! Please remove a piece or contact an admin to add another piece.`
      )
    } else {
      history.push('/admin/create/style')
    }
  }

  return (
    <React.Fragment>
      <ErrorBar open={!!error} error={error} handleClose={clearError} />
      <MessageBar
        open={!!message}
        message={message}
        handleClose={() => setMessage(null)}
      />
      <Background />
      <Container maxWidth="sm">
        <PageTitle title={title} />
        <Grid container direction="column" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <ActionButton
              onClick={handleClick}
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
      </Container>
    </React.Fragment>
  )
}

export default MyPieces
