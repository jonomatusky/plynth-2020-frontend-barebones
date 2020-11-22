import React from 'react'
import { Container, Grid } from '@material-ui/core'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`

const StyledGrid = styled(Grid)`
  height: 100%;
`

const CenteredGrid = ({ children }) => {
  return (
    <StyledContainer>
      <StyledGrid
        container
        direction="column"
        align="center"
        justify="center"
        wrap="nowrap"
        spacing={1}
      >
        {children}
      </StyledGrid>
    </StyledContainer>
  )
}

export default CenteredGrid
