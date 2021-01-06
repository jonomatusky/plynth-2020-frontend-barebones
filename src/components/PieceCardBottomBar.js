import React from 'react'
import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

const BottomBar = ({ piece }) => {
  const { status, user } = useSelector(state => state.user)
  const history = useHistory()

  return (
    <Box
      borderColor="secondary.main"
      bgcolor="background.card"
      border={1}
      borderTop={0}
    >
      <Button
        fullWidth
        color="secondary"
        onClick={() => {
          history.push(`/admin/pieces/${piece.id}/edit`)
        }}
        disabled={status !== 'succeeded' || piece.owner.id !== user.id}
      >
        Edit Your Piece
      </Button>
    </Box>
  )
}

export default BottomBar
