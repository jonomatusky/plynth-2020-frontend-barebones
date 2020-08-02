import React from 'react'

import { Button, Typography } from '@material-ui/core'

import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 0;
  height: 4em;
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
      <Typography variant="h6">
        <strong>{label}</strong>
      </Typography>
    </StyledButton>
  )
}

export default ActionButton
