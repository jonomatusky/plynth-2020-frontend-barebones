import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Grid, Box, Typography } from '@material-ui/core'

import ActionButton from 'components/ActionButton'

import { PieceBox, BarRow } from 'components/CardSections'

const SignUp = () => {
  const history = useHistory()

  return (
    <Container maxWidth="xs">
      <Grid container justify="flex-start" direction="column" spacing={2}>
        <Box height="20vh"></Box>
        <Grid item>
          <PieceBox container direction="column">
            <BarRow
              buttonLabel="Close X"
              onClick={() => {
                history.push('/admin')
              }}
            />
            <Box
              textAlign="center"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              minHeight="30vh"
            >
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Box height="0.75rem"></Box>
                <Grid item xs={11}>
                  <Typography variant="h5">
                    Your account has been created!
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography>
                    Get started by creating your first piece.
                  </Typography>
                </Grid>
                <Box height="1rem"></Box>
              </Grid>
            </Box>
            <ActionButton
              label="Get Started"
              component={Link}
              to="/admin/pieces"
            />
          </PieceBox>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignUp
