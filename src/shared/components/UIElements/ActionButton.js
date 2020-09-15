import React from 'react'

import { Button, Typography, Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

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
  height: 2.5rem;
`

const ButtonText = styled(Typography)`
  font-size: 1.2em;
`

const ActionButton = props => {
  const { fullWidth, label, variant, loading, ...other } = props

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
        disableRipple={props.loading}
        {...other}
      >
        {!loading && (
          <Box>
            <ButtonText>
              <strong>{label}</strong>
            </ButtonText>
          </Box>
        )}
        {loading && (
          <CircularProgress size="1.25rem" color="inherit" thickness={6} />
        )}
      </StyledButton>
    )
  }
}

export default ActionButton
