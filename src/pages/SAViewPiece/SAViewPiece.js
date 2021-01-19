import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Grid, Button } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import Background from 'layouts/Background'
import PageTitle from 'components/PageTitle'
import LoadingSpinner from 'components/LoadingSpinner'

import PieceCard from 'components/AdminPieceCard'

import { selectPiece } from 'redux/piecesSlice'

import NotFound from 'layouts/NotFound'

const ViewPiece = props => {
  const history = useHistory()
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))
  const { request } = useRequest()
  const { user } = useSelector(state => state.user)

  const { status } = useSelector(state => state.pieces)

  let [scanCount, setScanCount] = useState()
  let [clickCount, setClickCount] = useState()

  console.log(piece)

  useEffect(() => {
    const getCount = async id => {
      try {
        const { scanCount, clickCount } = await request({
          url: `/pieces/${id}/scans/count`,
        })
        setScanCount(scanCount)
        setClickCount(clickCount)
      } catch (err) {}
    }
    !!piece && getCount(piece.id)
  }, [piece, request])

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
