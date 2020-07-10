import React from 'react'
import { useParams } from 'react-router-dom'

import { Container } from '@material-ui/core'

import PieceCard from '../components/PieceCard'

const ViewPiece = () => {
  const pieceId = useParams().pieceId
  return (
    <Container maxWidth="sm">
      <PieceCard pieceId={pieceId} />
    </Container>
  )
}

export default ViewPiece
