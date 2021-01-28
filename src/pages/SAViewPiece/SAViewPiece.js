import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Grid, Button, Box } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'
import LoadingSpinner from 'components/LoadingSpinner'

import PieceCard from 'components/PieceCard'

import NotFound from 'layouts/NotFound'

const ViewPiece = props => {
  const history = useHistory()
  const { piece, pieceStatus, fetchPiece, status } = useSAPiecesStore()
  const { pieceId } = useParams()

  const { request, status: requestStatus } = useRequest()

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
    if (pieceId && requestStatus === 'idle') {
      getCount(pieceId)
    }
  }, [pieceId, request, requestStatus])

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log('fetching')
        await fetchPiece(pieceId)
      } catch (err) {}
    }

    if (pieceStatus === 'idle') {
      fetch()
    }
  }, [pieceId, request, pieceStatus, fetchPiece])

  return (
    <React.Fragment>
      {(pieceStatus === 'loading' || status === 'idle') && (
        <Container maxWidth="xs">
          <LoadingSpinner asOverlay />
        </Container>
      )}
      {pieceStatus === 'succeeded' && (
        <Container maxWidth="xs">
          <Box pt="1.5rem" pb="1.5rem">
            <Grid container justify="center">
              <Grid item xs={12}>
                <PieceCard
                  piece={piece}
                  showAnalytics={true}
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
                    onClick={() => {
                      history.push(`/superadmin/pieces/${piece.id}/edit`)
                    }}
                  >
                    Edit Piece
                  </Button>
                </Box>
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
                    onClick={() => {
                      history.push(`/superadmin/pieces/${piece.id}/reassign`)
                    }}
                  >
                    Reassign Piece
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {pieceStatus === 'failed' && <NotFound />}
      {pieceStatus === 'succeeded' && !piece && <NotFound />}
    </React.Fragment>
  )
}

export default ViewPiece
