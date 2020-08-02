import React from 'react'

import { Grid, Box, Typography } from '@material-ui/core'
import ActionBar from './ActionButton'

const ErrorMessage = props => {
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Box textAlign="center">
            <Typography variant="h6" align="center">
              {props.error}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ErrorMessage
