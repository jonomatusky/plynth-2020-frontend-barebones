import React from 'react'

import { Button, Typography, Box } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../../../theme'

const StyledButton = styled(Button)`
  border-radius: 0;
  padding: 0.6em;
  background-image: linear-gradient(
    90deg,
    ${theme.palette.primary.main},
    #920748
  );
`

const ButtonText = styled(Typography)`
  font-size: 1.2em;
`

const ActionButton = props => {
  const { fullWidth, label, variant, ...other } = props

  if (variant === 'text') {
    return (
      <Button
        color={'default'}
        fullWidth={fullWidth || true}
        variant={variant}
        {...other}
      >
        <Box>
          <ButtonText>
            <strong>{label}</strong>
          </ButtonText>
        </Box>
      </Button>
    )
  } else {
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
}

export default ActionButton
