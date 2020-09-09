import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid, Button } from '@material-ui/core'
import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

import PieceCard from '../components/PieceCard'
import { BottomRow } from '../../shared/components/UIElements/CardSections'
import ActionBar from '../../shared/components/Navigation/ActionBar'

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
  )
}

export default ViewPiece
