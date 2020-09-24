import React from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Grid, Box, Typography } from '@material-ui/core'
import { PieceBox, BarRow } from '../components/ui/CardSections'

import PageTitle from '../components/ui/PageTitle'

const FormLayout = ({ children, title, message, bar }, ...props) => {
  const history = useHistory()

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <Grid container justify="flex-start" direction="column" spacing={2}>
          <Box height="5vh"></Box>
          {title && (
            <Grid item>
              <PageTitle title={title} />
            </Grid>
          )}
          {message && (
            <Grid item>
              <Typography>{message}</Typography>
            </Grid>
          )}
          <Grid item>
            <PieceBox container direction="column">
              {bar || (
                <BarRow
                  buttonLabel="Cancel X"
                  onClick={() => {
                    history.goBack()
                  }}
                />
              )}
              <Grid item>
                <Grid container justify="center">
                  <Grid item xs={11}>
                    <Box height="1rem"></Box>
                    {children}
                  </Grid>
                </Grid>
              </Grid>
              <Box height="2rem"></Box>
            </PieceBox>
          </Grid>
          <Box height="2rem"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FormLayout
