import React, { useState } from 'react'

import { useHttpClient } from '../../shared/hooks/http-hook'

import { Container, Grid, Box, Button, Dialog, Slide } from '@material-ui/core'
import PieceCard from './PieceCard'
import PieceForm from './PieceForm'
import ActionButton from '../../shared/components/UIElements/ActionButton'

const { REACT_APP_BACKEND_URL } = process.env

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ViewPiece = props => {
  const { open, onClose, pieceId } = props
  const [editMode, setEditMode] = useState(false)

  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  const onSubmit = async formData => {
    try {
      const pieceData = { pieceData: formData }
      await sendRequest(
        `${REACT_APP_BACKEND_URL}/pieces/${pieceId}`,
        'PATCH',
        JSON.stringify(pieceData),
        {
          'Content-Type': 'application/json',
        }
      )
      setEditMode(false)
    } catch (err) {}
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Container maxWidth="sm">
        {!editMode && (
          <Grid container direction="column">
            <Grid item>
              <PieceCard
                pieceId={pieceId}
                onClose={onClose}
                onEdit={() => setEditMode(true)}
              />
            </Grid>
            <Grid item></Grid>
          </Grid>
        )}
        {editMode && (
          <Grid container direction="column">
            <Grid item align="right">
              <Button color="inherit" onClick={() => setEditMode(false)}>
                Cancel X
              </Button>
            </Grid>
            <Grid item>
              <PieceForm pieceId={pieceId} onSubmit={onSubmit} />
            </Grid>
          </Grid>
        )}
        <Box height="2rem"></Box>
      </Container>
    </Dialog>
  )
}

export default ViewPiece
