import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid, Box } from '@material-ui/core'
import { AuthContext } from '../../shared/context/auth-context'
import Background from '../../shared/layouts/Background'
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner'

import PieceCard from '../components/PieceCard'
import ErrorBar from '../../shared/components/notifications/ErrorBar'

const { REACT_APP_BACKEND_URL } = process.env

const ViewPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [piece, setPiece] = useState()
  const [isMine, setIsMine] = useState(false)
  const auth = useContext(AuthContext)
  const pieceId = useParams().pieceId

  const history = useHistory()

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const responseData = await sendRequest(
          `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`
        )
        setPiece(responseData.piece)
      } catch (err) {}
    }
    fetchPieces()
  }, [sendRequest, pieceId])

  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="sm">
        {isLoading && !piece && <LoadingSpinner asOverlay />}
        {!isLoading && piece && (
          <PieceCard
            piece={piece}
            onClose={() => {
              history.push('/admin/pieces')
            }}
          />
        )}
      </Container>
    </React.Fragment>
  )
}

export default ViewPiece
