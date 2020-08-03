import React from 'react'

import PieceCard from '../components/PieceCard'
import PrimaryModal from '../../shared/layouts/PrimaryModal'

const ViewPiece = props => {
  const { open, onClose, pieceId } = props

  return (
    <PrimaryModal open={open} onClose={onClose}>
      <PieceCard pieceId={pieceId} onClose={onClose} />
    </PrimaryModal>
  )
}

export default ViewPiece
