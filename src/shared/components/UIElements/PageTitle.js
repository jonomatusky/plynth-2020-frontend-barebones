import React from 'react'
import { Box, Typography } from '@material-ui/core'

const PageTitle = props => {
  return (
    <Typography variant="h5">
      <Box pt={2} pb={2} align="left" fontWeight="fontWeightBold">
        {props.title}
      </Box>
    </Typography>
  )
}

export default PageTitle
