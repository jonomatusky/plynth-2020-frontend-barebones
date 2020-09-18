import React from 'react'

import { Container, Grid, Box } from '@material-ui/core'
import { PieceBox } from '../components/ui/CardSections'

import Background from '../components/ui/Background'
import PageTitle from '../components/ui/PageTitle'

const FormLayout = ({ children, title }, ...props) => {
  return (
    <React.Fragment>
      <Background />
      <Container maxWidth="sm">
        <Grid container justify="flex-start" direction="column">
          {title && <PageTitle title={title} />}
          <PieceBox container direction="column">
            {children}
            <Box height="4vh"></Box>
          </PieceBox>
          <Box height="4vh"></Box>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default FormLayout
