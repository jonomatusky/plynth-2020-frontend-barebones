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
            {bar || <BarRow buttonLabel="Close X" onClose={onClose || null} />}
            <Grid item>
              <Box pt={2} pb={3}>
                <Grid container justify="center">
                  <Grid item xs={11}>
                    {children}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
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
  )
}

export default FormLayout
