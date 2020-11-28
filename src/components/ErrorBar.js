import React from 'react'
import { Snackbar, SnackbarContent, Button } from '@material-ui/core'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'

import { useAlertStore } from 'hooks/store/use-alert-store'
import theme from 'theme'

const StyledErrorContent = styled(SnackbarContent)`
  background-color: ${theme.palette.error.main};
  border-radius: 0;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  min-width: 30px;
`

const ErrorBar = props => {
  const { error, clearError } = useAlertStore()

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!error}
      onClose={clearError}
    >
      <StyledErrorContent
        message={error}
        action={
          <StyledButton onClick={clearError} color="inherit" size="small">
            <ClearIcon />
          </StyledButton>
        }
      />
    </Snackbar>
  )
}

export default ErrorBar
