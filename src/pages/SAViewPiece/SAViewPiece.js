import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Grid, Button } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import { useSAPiecesStore } from 'hooks/store/use-sa-pieces-store'
import Background from 'layouts/Background'
import PageTitle from 'components/PageTitle'
import LoadingSpinner from 'components/LoadingSpinner'

import PieceCard from 'components/SAPieceCard'

import NotFound from 'layouts/NotFound'

const ViewPiece = props => {
  const history = useHistory()
  const { selectPiece, status } = useSAPiecesStore()
  const { pieceId } = useParams()
  const selectedPiece = selectPiece(pieceId)

  const [piece, setPiece] = useState()

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
    if (piece) {
      getCount(piece.id)
    }
  }, [piece, request])

  useEffect(() => {
    const fetchPiece = async () => {
      if (!!selectedPiece) {
        setPiece(selectedPiece)
      } else {
        try {
          console.log('fetching')
          const { piece } = await request(`/pieces/${pieceId}`)
          setPiece(piece)
        } catch (err) {}
      }
    }
    if (status === 'succeeded') {
      fetchPiece()
    }
  }, [pieceId, request, status, selectedPiece])

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="xs" disableGutters>
        {(status === 'loading' ||
          status === 'idle' ||
          requestStatus === 'loading') && <LoadingSpinner asOverlay />}
        {!!piece && (
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
            <Grid item>
              <Button
                onClick={() =>
                  history.push(`/superadmin/pieces/${piece.id}/edit`)
                }
              >
                Edit This Piece
              </Button>
            </Grid>
          </Grid>
        )}
        {requestStatus === 'failed' && <NotFound />}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
