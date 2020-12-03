import React from 'react'

import { Button, Typography, Box, CircularProgress } from '@material-ui/core'

import styled from 'styled-components'
import theme from '../theme'

const StyledButton = styled(Button)`
  border-radius: 0;
  padding: 0.6em;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  background-image: linear-gradient(
    90deg,
    ${theme.palette.primary.main},
    #920748
  );
  min-height: 2.75rem;
`

const ButtonText = styled(Typography)`
  font-size: 1.2em;
  letter-spacing: 1px;
`

const ActionButton = props => {
  const { fullWidth, label, variant, loading, onClick, ...other } = props

  if (variant === 'text') {
    return (
      <Button
        color={'default'}
        fullWidth={fullWidth}
        variant={variant}
        onClick={onClick}
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
        fullWidth={fullWidth === false ? false : true}
        variant={variant || 'contained'}
        disableRipple={props.loading}
        onClick={!loading ? onClick : null}
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
