import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

import { useApiClient } from 'hooks/api-hook'
import { selectPiece } from 'redux/piecesSlice'
import LoadingSpinner from 'components/LoadingSpinner'
import NotFound from 'layouts/NotFound'
import PieceCard from 'components/PieceCard'

const ViewPiece = props => {
  const { sendRequest } = useApiClient()
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
        const { scanCount, clickCount } = await sendRequest({
          url: `/pieces/${id}/scans/count`,
        })
        setScanCount(scanCount)
        setClickCount(clickCount)
      } catch (err) {}
    }
    if (piece && showAnalytics) {
      getCount(piece.id)
    }
  }, [piece, showAnalytics, sendRequest])

  return (
    <React.Fragment>
      {(status === 'loading' || status === 'idle') && (
        <Container maxWidth="xs" disableGutters>
          <LoadingSpinner asOverlay />
        </Container>
      )}
      {status === 'succeeded' && !!piece && (
        <Container maxWidth="xs" disableGutters>
          <PieceCard
            piece={piece}
            showAnalytics={showAnalytics}
            scanCount={scanCount}
            clickCount={clickCount}
          />
        </Container>
      )}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !piece && <NotFound />}
    </React.Fragment>
  )
}

export default ViewPiece
