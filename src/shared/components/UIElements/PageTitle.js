import React from 'react'
import { Box, Typography } from '@material-ui/core'

const PageTitle = props => {
  return (
    <Box pt={2} pb={2} align="left">
      <Typography component="h1" variant="h4">
        {props.title}
      </Typography>
    </Box>
  )
}

export default PageTitle
