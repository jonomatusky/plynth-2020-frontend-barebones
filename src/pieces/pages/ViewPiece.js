import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '@material-ui/core'

import PieceCard from '../components/PieceCard'

const { REACT_APP_BACKEND_URL, REACT_APP_ASSET_URL } = process.env

const ViewPiece = () => {
  const pieceId = useParams().pieceId
  return (
    <Container maxWidth="sm">
      <PieceCard pieceId={pieceId} />
    </Container>
  )
}

export default ViewPiece
