import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, SnackbarContent, Button } from '@material-ui/core'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'

import { setError } from '../../../redux/messageSlice'
import theme from '../../../theme'

const StyledErrorContent = styled(SnackbarContent)`
  background-color: ${theme.palette.error.main};
  border-radius: 0;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  min-width: 30px;
`

const ErrorBar = props => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.message)

  const clearError = () => {
    dispatch(setError(null))
  }

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
