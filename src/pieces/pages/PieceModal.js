import React from 'react'
import { Grid, Box } from '@material-ui/core'

import PieceCard from '../components/PieceCard'
import PrimaryModal from '../../shared/layouts/PrimaryModal'

// need to change loggedOut to auth instead of props
const PieceModal = ({ open, onClose, piece }) => {
  return (
    <PrimaryModal open={open} onClose={onClose}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Box minHeight="2vh"></Box>
        <PieceCard piece={piece} onClose={onClose} />
        <Box minHeight="2vh"></Box>
      </Grid>
    </PrimaryModal>
  )
}

export default PieceModal
