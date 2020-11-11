import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Snackbar, SnackbarContent, Button } from '@material-ui/core'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'

import { setMessage } from '../redux/alertSlice'
import theme from '../theme'

const MessageContent = styled(SnackbarContent)`
  background-color: ${theme.palette.secondary.main};
  border-radius: 0;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  min-width: 30px;
`

const MessageBar = props => {
  const dispatch = useDispatch()
  const { message } = useSelector(state => state.alert)

  const clearMessage = () => {
    dispatch(setMessage(null))
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!message}
      onClose={clearMessage}
    >
      <MessageContent
        message={message}
        action={
          <StyledButton onClick={clearMessage} color="inherit" size="small">
            <ClearIcon />
          </StyledButton>
        }
      />
    </Snackbar>
  )
}

export default MessageBar
