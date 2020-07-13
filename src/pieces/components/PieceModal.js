import React from 'react'

import { Container, Box, Dialog, Slide } from '@material-ui/core'

import PieceCard from '../components/PieceCard'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ViewPiece = props => {
  const { open, onClose, pieceId } = props

  console.log(pieceId)

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Container maxWidth="sm">
        <PieceCard pieceId={pieceId} onClose={onClose} />
        <Box height="2rem"></Box>
      </Container>
    </Dialog>
  )
}

export default ViewPiece
