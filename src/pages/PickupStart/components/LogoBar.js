import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, Link } from '@material-ui/core'

import plynthLogo from '../../../images/plynth-logo-white.png'
import styled from 'styled-components'

const StyledLogo = styled.img`
  opacity: 0.4;
  width: 80vw;
  max-width: 80px;
  &:hover {
    opacity: 0.6;
  }
`

const BottomBar = styled.div`
  top: 'auto';
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  right: 0;
`

const LogoBar = () => {
  return (
    <BottomBar>
      <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item>
          <a
            href="https://site.plynth.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <StyledLogo src={plynthLogo} alt="Plynth Logo" />
          </a>
        </Grid>
        <Grid item>
          <Typography>
            {`Already have an account? `}
            <Link
              component={RouterLink}
              to="/admin/login"
              color="inherit"
              underline="always"
            >
              Sign In
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">
            <Link
              href="https://site.plynth.com"
              color="inherit"
              underline="always"
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn More
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </BottomBar>
  )
}

export default LogoBar