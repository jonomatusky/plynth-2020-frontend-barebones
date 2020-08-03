import React from 'react'
import { Dialog, Container, Box, Slide } from '@material-ui/core'

import theme from '../../theme'
import styled from 'styled-components'

const ModalBackground = styled(Box)`
  background-image: linear-gradient(
    0deg,
    ${theme.palette.primary.main}50,
    ${theme.palette.primary.main}00
  );
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 0;
  bottom: 0;
`

const StyledContainer = styled(Container)`
  z-index: 1;
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PrimaryModal = ({ open, handleClose, children }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <ModalBackground />
      <StyledContainer maxWidth="xs" disableGutters={true}>
        {children}
      </StyledContainer>
    </Dialog>
  )
}

export default PrimaryModal
