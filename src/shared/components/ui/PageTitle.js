import React from 'react'
import { Box, Typography } from '@material-ui/core'

const PageTitle = props => {
  return (
    <Box pt={3} pb={2} display="flex" justifyItems="center">
      <Box width="100%">
        <Typography variant="h5">
          <Box align="left" fontWeight="fontWeightBold">
            {props.title}
          </Box>
        </Typography>
      </Box>
      <Box flexShrink={0}>{props.children}</Box>
    </Box>
  )
}

export default PageTitle
