import React from 'react'

import { Button } from '@material-ui/core'

import styled from 'styled-components'

const StyledButton = styled(Button)`
  border-radius: 0;
  font-weight: bold;
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
      {label}
    </StyledButton>
  )
}

export default ActionButton
