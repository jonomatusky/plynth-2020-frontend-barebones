import React from 'react'

import { Button, Typography, Box } from '@material-ui/core'

import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 0;
  padding: 0.6em;
`

const ButtonText = styled(Typography)`
  font-size: 1.2em;
`

const ActionButton = props => {
  const { fullWidth, label, variant, ...other } = props
  return (
    <StyledButton
      color={variant && variant === 'text' ? 'default' : 'primary'}
      fullWidth={fullWidth || true}
      variant={variant || 'contained'}
      {...other}
    >
      <Box>
        <ButtonText>
          <strong>{label}</strong>
        </ButtonText>
      </Box>
    </StyledButton>
  )
}

export default ActionButton
