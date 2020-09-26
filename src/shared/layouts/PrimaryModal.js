import React from 'react'
import { Dialog, Container, Box } from '@material-ui/core'

import theme from '../../theme'
import styled from 'styled-components'

const ModalBackground = styled(Box)`
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}70,
    ${theme.palette.primary.main}00
  );
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
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
