import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Grid, Button } from '@material-ui/core'

import { useApiClient } from '../../shared/hooks/api-hook'
import Background from '../../shared/layouts/Background'
import PageTitle from '../../shared/components/ui/PageTitle'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/AdminPieceCard'

import { selectPiece } from '../../redux/piecesSlice'

import NotFound from '../../shared/components/navigation/NotFound'

const ViewPiece = props => {
  const history = useHistory()
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))
  const { sendRequest } = useApiClient()
  const { user } = useSelector(state => state.auth)

  const { status } = useSelector(state => state.pieces)

  let [scanCount, setScanCount] = useState()
  let [clickCount, setClickCount] = useState()

  useEffect(() => {
    const getCount = async id => {
      try {
        const { scanCount, clickCount } = await sendRequest({
          url: `/pieces/${id}/scans/count`,
        })
        setScanCount(scanCount)
        setClickCount(clickCount)
      } catch (err) {}
    }
    !!piece && getCount(piece.id)
  }, [piece, sendRequest])

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs" disableGutters>
        {(status === 'loading' || status === 'idle') && (
          <LoadingSpinner asOverlay />
        )}
        {status === 'succeeded' && !!piece && (
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
        {status === 'failed' && <NotFound />}
        {status === 'succeeded' && !piece && <NotFound />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
