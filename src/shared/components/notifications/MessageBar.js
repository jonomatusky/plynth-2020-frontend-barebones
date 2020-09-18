import React from 'react'

import { Snackbar, SnackbarContent, Button } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../../theme'

import ClearIcon from '@material-ui/icons/Clear'

const StyledErrorContent = styled(SnackbarContent)`
  background-color: ${theme.palette.secondary.main};
  border-radius: 0;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  min-width: 30px;
`

const MessageBar = props => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.open}
      onClose={props.handleClose}
    >
      <StyledErrorContent
        message={props.message}
        action={
          <StyledButton
            onClick={props.handleClose}
            color="inherit"
            size="small"
          >
            <ClearIcon />
          </StyledButton>
        }
      />
    </Snackbar>
  )
}

export default MessageBar
