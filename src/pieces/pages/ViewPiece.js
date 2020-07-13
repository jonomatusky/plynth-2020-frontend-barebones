import React from 'react'
import { useParams, NavLink } from 'react-router-dom'

import { Container } from '@material-ui/core'

import PieceCard from '../components/PieceCard'
import ActionBar from '../../shared/components/Navigation/ActionBar'

const ViewPiece = () => {
  const pieceId = useParams().pieceId
  return (
    <Container maxWidth="sm">
      <PieceCard pieceId={pieceId} />
      <ActionBar component={NavLink} to={'/collection'} primaryLabel="Done" />
    </Container>
  )
}

export default ViewPiece
