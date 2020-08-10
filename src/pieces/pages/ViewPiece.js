import React, { useState, useEffect } from 'react'
import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container } from '@material-ui/core'

import PieceCard from '../components/PieceCard'
import ActionBar from '../../shared/components/Navigation/ActionBar'

const { REACT_APP_BACKEND_URL } = process.env

const ViewPiece = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [piece, setPiece] = useState()
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
      {piece && (
        <PieceCard
          piece={piece}
          onClose={() => {
            history.push('/collection')
          }}
        />
      )}
    </Container>
  )
}

export default ViewPiece
