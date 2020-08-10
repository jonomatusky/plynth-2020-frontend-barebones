import React from 'react'
// import { useHttpClient } from '../../shared/hooks/http-hook'

import PieceCard from '../components/PieceCard'
import PrimaryModal from '../../shared/layouts/PrimaryModal'
import { Grid, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

// need to change loggedOut to auth instead of props
const PieceModal = ({ open, onClose, piece }) => {
  const history = useHistory()

  return (
    <PrimaryModal open={open} onClose={onClose}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <PieceCard piece={piece} onClose={onClose} />
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              history.push(`/pieces/${piece.id}`)
            }}
          >
            View Full Screen
          </Button>
        </Grid>
      </Grid>
    </PrimaryModal>
  )
}

export default PieceModal
