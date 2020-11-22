import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Container, Grid, Typography, Link } from '@material-ui/core'

import styled from 'styled-components'
import plynthLogo from 'images/plynth-logo-white.png'
import plynthLogoHeader from 'images/Plynth-Loading-Final.png'

const LogoLarge = styled.img`
  margin-top: 15vh;
  margin-bottom: 1rem;
  max-width: 80px;
`

const Logo = styled.img`
  opacity: 0.4;
  width: 80vw;
  max-width: 80px;
  &:hover {
    opacity: 0.6;
  }
`

const LogoBar = styled.div`
  top: 'auto';
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  right: 0;
`

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        align="center"
        justify="center"
        wrap="nowrap"
        spacing={1}
      >
        <Grid item>
          <LogoLarge src={plynthLogoHeader} alt="Plynth Logo Large" />
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            The page you’re looking for doesn’t exist.
          </Typography>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="always"
          >
            <Typography align="center">Back to Home</Typography>
          </Link>
        </Grid>
      </Grid>
      <LogoBar>
        <Grid container direction="column" alignItems="center" spacing={0}>
          <Grid item>
            <Logo src={plynthLogo} alt="Plynth Logo" />
          </Grid>
        </Grid>
      </LogoBar>
    </Container>
  )
}

export default NotFound
