import React, { useState, useEffect } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Typography,
  Paper,
} from '@material-ui/core'
import { PieceBox, BarRow } from '../ui/CardSections'
import ActionButton from '../ui/ActionButton'

const NotificationModal = ({
  open,
  handleClose,
  primaryMessage,
  secondaryMessage,
  primaryAction,
  primaryActionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{primaryMessage}</DialogTitle>
      <DialogContent dividers>{secondaryMessage}</DialogContent>
      <DialogActions>
        <ActionButton
          fullWidth={false}
          variant="text"
          onClick={secondaryAction}
          label={secondaryActionLabel}
        />
        <ActionButton
          fullWidth={false}
          onClick={primaryAction}
          label={primaryActionLabel}
        />
      </DialogActions>
      {/* <PieceBox container direction="column">
        <BarRow buttonLabel="Cancel X" onClick={handleClose} />
        <Paper>
          <Grid container justify="center" alignItems="center">
            <Box height="0.75rem"></Box>
            <Grid item xs={11}>
              <Typography variant="h5">{primaryMessage}</Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography>{secondaryMessage}</Typography>
            </Grid>
            <Grid item xs={11}>
              <ActionButton
                onClick={primaryAction}
                label={primaryActionLabel}
              />
            </Grid>
          </Grid>
        </Paper> */}

      {/* <ActionButton
              variant="text"
              onClick={secondaryAction}
              label={secondaryActionLabel}
            /> */}
      {/* </PieceBox> */}
    </Dialog>
  )
}

export default NotificationModal
