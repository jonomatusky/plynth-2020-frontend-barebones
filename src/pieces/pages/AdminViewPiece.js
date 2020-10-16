import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Grid, Button } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import ErrorBar from '../../shared/components/notifications/ErrorBar'
import Background from '../../shared/layouts/Background'
import PageTitle from '../../shared/components/ui/PageTitle'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/AdminPieceCard'

const ViewPiece = props => {
  const history = useHistory()
  const pieceId = useParams().pieceId
  const { user } = useSelector(state => state.auth)
  const { error, sendRequest, clearError } = useApiClient()

  const piece = useSelector(state =>
    (state.pieces.pieces || []).find(piece => piece.id === pieceId)
  )

  let [scanCount, setScanCount] = useState()
  let [clickCount, setClickCount] = useState()

  useEffect(() => {
    const getCount = async id => {
      try {
        const { scanCount, clickCount } = await sendRequest(
          `/pieces/${id}/scans/count`
        )
        setScanCount(scanCount)
        setClickCount(clickCount)
      } catch (err) {}
    }
    !!piece && getCount(piece.id)
  }, [piece, sendRequest])

  return (
    <React.Fragment>
      {/* <ErrorBar open={!!error} error={error} handleClose={clearError} /> */}
      <Background />
      <Container maxWidth="xs" disableGutters>
        {piece && (
          <Grid container justify="center">
            <Grid item xs={11}>
              {piece.isRemoved && <PageTitle title="REMOVED" />}
            </Grid>
            <Grid item>
              <PieceCard
                piece={piece}
                scanCount={scanCount}
                clickCount={clickCount}
              />
            </Grid>
            {user.username !== piece.owner.username && (
              <Grid item>
                <Button
                  onClick={() => history.push(`/admin/pieces/${piece.id}/edit`)}
                >
                  Edit This Piece
                </Button>
              </Grid>
            )}
          </Grid>
        )}
        {!piece && <LoadingSpinner asOverlay />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
