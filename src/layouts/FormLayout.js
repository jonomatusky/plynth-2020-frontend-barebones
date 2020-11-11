import React from 'react'

import { Container, Grid, Box, Typography } from '@material-ui/core'
import { PieceBox, BarRow, BottomRow } from 'components/CardSections'

import PageTitle from 'components/PageTitle'

const FormLayout = ({
  children,
  title,
  message,
  bar,
  bottom,
  below,
  onClose,
  ...props
}) => {
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
          <Grid item>
            <PieceBox container direction="column">
              {bar || (
                <BarRow buttonLabel="Cancel X" onClose={onClose || null} />
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
              <BottomRow container justify="center">
                {bottom}
              </BottomRow>
            </PieceBox>
          </Grid>
          <Grid item>
            <Grid container justify="center">
              <Grid item>{below}</Grid>
            </Grid>
          </Grid>
          <Box height="1rem"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FormLayout
