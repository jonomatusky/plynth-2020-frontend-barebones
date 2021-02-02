import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Box, Grid, Button } from '@material-ui/core'

import { usePieceStore } from 'hooks/store/use-piece-store'
import { useUserStore } from 'hooks/store/use-user-store'
import { useRequest } from 'hooks/use-request'
import LoadingSpinner from 'components/LoadingSpinner'
import NotFound from 'layouts/NotFound'
import PieceCard from 'components/PieceCard'

const ViewPiece = props => {
  const { selectPiece, status } = usePieceStore()
  const { user } = useUserStore()
  const { request } = useRequest()
  const { pieceId } = useParams()
  const piece = selectPiece(pieceId)

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
          <Box pt="1.5rem" pb="1.5rem">
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
                <Box
                  borderColor="secondary.main"
                  bgcolor="background.card"
                  border={1}
                  borderTop={0}
                >
                  <Button
                    fullWidth
                    color="secondary"
                    component={Link}
                    to={`/admin/pieces/${piece.id}/edit`}
                    disabled={
                      status !== 'succeeded' || piece.owner.id !== user.id
                    }
                  >
                    Edit Your Piece
                  </Button>
                </Box>
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
