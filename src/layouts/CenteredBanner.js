import React from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
// import theme from 'theme'

const StyledGrid = styled(Grid)`
  height: 100vh;
`

// const StyledBox = styled(Box)`
//   color: ${theme.palette.background.default},
//   background-image: linear-gradient(
//     0deg,
//     ${theme.palette.primary.main}70,
//     ${theme.palette.primary.main}00
//   );
// `

const CenteredGrid = ({ children }) => {
  return (
    <StyledGrid
      container
      direction="column"
      align="center"
      justify="space-between"
      wrap="nowrap"
    >
      {/* <StyledBox> */}
      {children}
      {/* </StyledBox> */}
    </StyledGrid>
  )
}

export default CenteredGrid
