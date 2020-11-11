import React from 'react'

import { Container, Grid, Box, Typography } from '@material-ui/core'
import PageTitle from '../components/PageTitle'

const FormLayout = ({ children, title, message, ...props }) => {
  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          {title ? (
            <Grid item>
              <PageTitle title={title} />
            </Grid>
          ) : (
            <Box height="5vh"></Box>
          )}
          {message && (
            <Grid item>
              <Typography>{message}</Typography>
            </Grid>
          )}
          <Grid item>{children}</Grid>
          <Box height="1rem"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FormLayout
