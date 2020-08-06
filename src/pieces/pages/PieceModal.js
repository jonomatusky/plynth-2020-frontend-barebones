import React from 'react'
// import { useHttpClient } from '../../shared/hooks/http-hook'

import PieceCard from '../components/PieceCard'
import PrimaryModal from '../../shared/layouts/PrimaryModal'

// need to change loggedOut to auth instead of props
const PieceModal = ({ open, onClose, piece }) => {
  return (
    <PrimaryModal open={open} onClose={onClose}>
      <PieceCard piece={piece} onClose={onClose} />
    </PrimaryModal>
  )
}

export default PieceModal
