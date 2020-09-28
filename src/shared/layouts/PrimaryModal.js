import React from 'react'
import { Dialog, Container } from '@material-ui/core'

import theme from '../../theme'
import styled from 'styled-components'

import Background from './Background'

const ModalBackground = styled(Background)`
  z-index: 0;
`

const StyledContainer = styled(Container)`
  z-index: 1;
`

const PrimaryModal = ({ open, handleClose, children }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
        },
      }}
    >
      <ModalBackground />
      <StyledContainer maxWidth="xs" disableGutters>
        {children}
      </StyledContainer>
    </Dialog>
  )
}

export default PrimaryModal
