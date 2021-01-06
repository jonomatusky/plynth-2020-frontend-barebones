import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Box, Grid } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import { selectPiece } from 'redux/piecesSlice'
import LoadingSpinner from 'components/LoadingSpinner'
import NotFound from 'layouts/NotFound'
import PieceCard from 'components/PieceCard'
import BottomBar from 'components/PieceCardBottomBar'

const ViewPiece = props => {
  const { request } = useRequest()
  const pieceId = useParams().pieceId
  const piece = useSelector(state => selectPiece(state, pieceId))
  const { user } = useSelector(state => state.user)

  const { status } = useSelector(state => state.pieces)

  let showAnalytics = (user || {}).tier !== 'free'
  let [scanCount, setScanCount] = useState()
  let [clickCount, setClickCount] = useState()

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
    if (piece && showAnalytics) {
      getCount(piece.id)
    }
  }, [piece, showAnalytics, request])

  return (
    <React.Fragment>
      {(status === 'loading' || status === 'idle') && (
        <Container maxWidth="xs">
          <LoadingSpinner asOverlay />
        </Container>
      )}
      {status === 'succeeded' && !!piece && (
        <Container maxWidth="xs">
          <Box pt="1.5rem" pb="1rem">
            <Grid container justify="center">
              <Grid item xs={12}>
                <PieceCard
                  piece={piece}
                  showAnalytics={showAnalytics}
                  scanCount={scanCount}
                  clickCount={clickCount}
                />
              </Grid>
              <Grid item xs={12}>
                <BottomBar piece={piece} />
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !piece && <NotFound />}
    </React.Fragment>
  )
}

export default ViewPiece
